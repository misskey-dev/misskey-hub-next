// 変更したら「デプロイ」を行うこと
const env = PropertiesService.getScriptProperties().getProperties();

// Misskey
const MI_API_TOKEN = env.MISSKEY_API_TOKEN ?? null;

// Cloudflare
const CF_API_TOKEN = env.CF_API_TOKEN ?? null;
const CF_ZONE_ID = env.CF_ZONE_ID ?? null;

// Github 前のコミットSHA
const GH_PREVIOUS_COMMIT_SHA = env.GH_PREVIOUS_COMMIT_SHA ?? null;

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

  // 今回のSHAを保存
  PropertiesService.getScriptProperties().setProperty('GH_PREVIOUS_COMMIT_SHA', params.deployment.sha);
}

function getChangeLog(d) {
  if (!GH_PREVIOUS_COMMIT_SHA) return null;

  const res = JSON.parse(UrlFetchApp.fetch(`https://api.github.com/repos/misskey-dev/misskey-hub-next/compare/${GH_PREVIOUS_COMMIT_SHA}...${d.deployment.sha}`).getContentText());

  return res.commits.map((commit) => `・${commit.commit.message.split('\n')[0]}`).filter((v) => !v.startsWith('・Merge branch \'master\' of')).reverse().join('\n');
}

function postToMisskey(d) {
  var data = {
    i: MI_API_TOKEN,
    text: `$[tada 📢] **Misskey Hub が更新されました！**
早速チェックしましょう ▶ ${d?.repository?.homepage ?? 'https://misskey-hub.net/'}

**【今回の更新点】**
${getChangeLog(d) ?? "取得できませんでした…"}`,
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