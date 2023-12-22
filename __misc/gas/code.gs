// プログラムを変更したら都度「デプロイ」を行うこと

// スクリプト プロパティを取得
const env = PropertiesService.getScriptProperties().getProperties();

// Misskey
const MI_API_TOKEN = env.MISSKEY_API_TOKEN ?? null;

// Cloudflare
const CF_API_TOKEN = env.CF_API_TOKEN ?? null;
const CF_ZONE_ID = env.CF_ZONE_ID ?? null;

// Webhook受信時のハンドラ
function doPost(e) {
  const params = JSON.parse(e.postData.getDataAsString());

  // プロダクションのデプロイ以外・デプロイ成功以外には反応しない
  if (params?.deployment?.environment !== 'Production' || params?.action !== 'created') {
    return;
  }
  
  // Cloudflareのキャッシュパージをやる
  if (CF_API_TOKEN && CF_ZONE_ID) {
    purgeCfCache();
  }

  // デプロイされたことをMisskeyに通知する
  if (MI_API_TOKEN) {
    postToMisskey(params);
  }
}

function postToMisskey(d) {
  var data = {
    i: MI_API_TOKEN,
    text: `$[tada 📢] **Misskey Hub が更新されました！**
早速チェックしましょう ▶ ${d?.repository?.homepage ?? 'https://misskey-hub.net/'}`,
    visibility: 'public',
    cw: null,
    localOnly: false,
    reactionAcceptance: 'nonSensitiveOnly',
    poll: null,
  };

  var options = {
    contentType: "application/json",
    method: "POST",
    payload: JSON.stringify(data),
  };

  const createResult = JSON.parse(UrlFetchApp.fetch("https://misskey.io/api/notes/create", options).getContentText());

  Logger.log(createResult);
}

function purgeCfCache() {
  var data = {
    purge_everything: true,
  };

  var options = {
    contentType: "application/json",
    method: "POST",
    headers: {
      'Authorization': `Bearer ${CF_API_TOKEN}`,
    },
    payload: JSON.stringify(data),
  };

  const createResult = JSON.parse(UrlFetchApp.fetch(`https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`, options).getContentText());

  Logger.log(createResult);
}