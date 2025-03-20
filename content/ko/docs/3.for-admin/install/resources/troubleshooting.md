# 수동 설치 시 문제 해결

<small>2018년 10월 07일 / 2021년 12월 20일 최종 업데이트 / 문책 aqz/tamaina</small>

MisskeyInstallBattle 참가자가 늘어났지만, 그에 따라 시간이 지날수록 중경상자가 증가하고 있습니다.\
이 글에서는 이러한 부상을 줄이기 위해 과거에 사고가 발생했던 부분의 경향과 대책을 알기 쉽게 설명합니다.

**먼저, [구축 안내서](../guides/manual/)를 숙지하시기 바랍니다.**

또한, 제 저서 [Ubuntu용 systemd 해설](https://hide.ac/articles/iFwm5HDvH), [Oracle Cloud 버전 상세 해설](https://hide.ac/articles/csERs-7SU)도 참고해 주시면 감사하겠습니다.

# 우분투용 쉘 스크립트 안내

우분투에 대한 설명은 복사, 붙여넣기로만 이루어져 있어 재미없어요!시간이 걸린다!어쨌든 귀찮다!

……어라, 복사-붙여넣기만으로 할 수 있다면 완전 자동화가 가능하지 않을까?

그래서 **쉘 스크립트로 거의 모든 것을 해주는 것을 만들어 보았습니다!**\
[\*\*자세한 내용 및 사용법은 여기에서 확인하세요!]\*\*https://github.com/joinmisskey/bash-install#readme](https://github.com/joinmisskey/bash-install#readme)

도메인 구매 및 Cloudflare 설정, 서버 확보는 여러분이 직접 준비해 주시기 바랍니다.

쉘 스크립트에 문제가 있으면 [제작자(aqz)](https://p1.a9z.dev/@aqz)에게 알려주시면 감사하겠습니다.

# 설치 및 빌드

[구축 안내서](../guides/manual/)을 잘 읽어보세요.

## ImageMagick 관련

_**ImageMagick이 필요하지 않습니다!**_

## 빌드가 실패하는 경우

Misskey를 빌드하기 위해서는 최소 2GB의 메모리가 필요하다는 것이 경험상 권장됩니다.\
서버를 확장하는 방법도 있지만, PC에서 빌드하여 서버에 배포하는 방법도 있습니다.

## 왠지 잘 안 풀린다

- [구축 안내서](../guides/manual/)을 잘 읽어보세요.
- node.js의 버전이 오래되었나요?
  - 새로운 버전으로 해봅시다.
- 설치나 빌드시 Error나 WARN 같은 것이 나올 수 있지만, 문제가 없는 경우도 있습니다.일단 `npm start`로 동작을 확인해 봅시다.
- node-gyp이 설치되지 않았나요?
  - `apt install build-essential`을 시도합니다.
  - 윈도우는 [이 글](https://qiita.com/AkihiroTakamura/items/25ba516f8ec624e66ee7)도 참고해 보세요.
- 그래도 안 되면 처음부터 다시 [구축 가이드](../guides/manual/)의 절차에 따라 다시 시도해 보세요.

## 버전업 후 문제 발생

- [구축 가이드](../guides/manual/) 및 릴리즈 노트를 잘 읽어보세요.
- Misskey 버전업 시에는 반드시 `pnpm install`이나 `pnpm run migrate`를 해주시기 바랍니다.그래도 해결되지 않으면 `pnpm run clean-all && pnpm install`을 시도하고, `pnpm run build && pnpm run migrate && pnpm start`를 시도해 보십시오.
- 그래도 안 되면 처음부터 다시 [구축 가이드](../guides/manual/)의 절차에 따라 다시 시도해 보세요.

---

# 설정

[구축 안내서](../guides/manual/)를 잘 읽어보세요.

`.config/default.yml`에서 설정을 합니다.
[`.config/example.yml`](https://github.com/misskey-dev/misskey/blob/develop/.config/example.yml)을 복사하여 주석에 따라 작성합니다.

(YAML 형식에서는 `#`부터 줄 끝까지는 주석으로 취급합니다.）

## URL 및 포트 번호

URL과 포트 번호의 구조가 조금 이해하기 어려운 것 같습니다.

`.config/example.yml`に「Port and TLS settings」として説明図付きで順に書かれていますので、それに沿って設定をしていきましょう。
本文の解説を日本語訳しながらやっていきます。

### URL의 설정

```yml
# Final accessible URL seen by a user.
# 사용자가 최종적으로 접속하는 URL
url: https://example.tld/
```

**`url`には、サーバーにブラウザでアクセスしたときアドレスバーに表示される**(したい)**URLを書きます。**

### ポートの設定

```yml
#   ┌───────────────────────┐
#───┘ Port and TLS settings └───────────────────────────────────
#### ポートとTLSの設定         ####################################

# Misskey requires a reverse proxy to support HTTPS connections.
# MisskeyでHTTPS接続をサポートするにはリバースプロキシが必須です。
#
#                 +----- https://example.tld/ ------------+
#   +------+      |+-------------+      +----------------+|
#   | User | ---> || Proxy (443) | ---> | Misskey (3000) ||
#   +------+      |+-------------+      +----------------+|
#                 +---------------------------------------+
#
#   You need to set up a reverse proxy. (e.g. nginx)
#   この方法では、リバースプロキシ（例: nginx）をセットアップする必要があります。
#   An encrypted connection with HTTPS is highly recommended
#   because tokens may be transferred in GET requests.
#   GETリクエストでトークンがURLに含まれる可能性があるため、
#   HTTPSによる暗号化を強く推奨します。
```

```yml

#   ┌───────────────────────┐
#───┘ Port and TLS settings └───────────────────────────────────
#### 포트 및 인증서 설정      ####################################
#
# Misskey supports two deployment options for public.
# Misskey는 두 가지 서버 개설 방법을 지원합니다.
#

# Option 1: With Reverse Proxy
# 방법 1 리버스 프록시 거치기
#
#                 +----- https://example.tld/ ------------+
#   +------+      |+-------------+      +----------------+|
#   | User | ---> || Proxy (443) | ---> | Misskey (3000) ||
#   +------+      |+-------------+      +----------------+|
#                 +---------------------------------------+
#
#   You need to setup reverse proxy. (eg. Nginx)
#   이 방법을 사용하려면 리버스 프록시(예: Nginx)를 설정해야 합니다.
#   You do not define 'https' section.
#   'https' 섹션(후술)은 설정하지 않고 주석 처리된 상태로 둡니다.

# Option 2: Standalone
# 방법 2 독립 실행형
#           (리버스 프록시를 거치지 않고, node의 프로세스에서 직접 사용자로부터 접근을 받습니다.)
#
#                 +- https://example.tld/ -+
#   +------+      |   +---------------+    |
#   | User | ---> |   | Misskey (443) |    |
#   +------+      |   +---------------+    |
#                 +------------------------+
#
#   You need to run Misskey as root.
#   이 방법을 사용하려면 Misskey를 루트(권한이 부여된 상태)로 실행해야 합니다.
#   You need to set Certificate in 'https' section.
#   'https' 섹션(후술)에서 인증서를 설정해야 합니다.
```

この例では、Misskeyはポート3000で通信します。
リバースプロキシでは、ローカル側の宛先にこのポート番号を指定します。

----

# `npm start` 및 접속 시 자주 발생하는 오류

`npm start`로 서버를 시작했지만, 그 후 문제가 발생하는 경우도 있습니다.

먼저, [구축 안내서](../guides/manual/) 를 잘 읽어보세요.

## YAML 오류 발생

`default.yml` 구문에 오류가 있을 수 있습니다.
줄머리에 여분의 공백은 없나요?

## redis에 연결할 수 없음

redis-server가 실행되고 있습니까?
어떤 연결 수 제한에 도달하지 않았습니까?

11.20.2 이전 버전의 Misskey는 redis의 비밀번호를 풀 수 없습니다.다음 두 가지 사항을 확인하시기 바랍니다.

- redis에 비밀번호를 설정하지 않는다.
- `default.yml`의 `redis:`의 `pass:` 행을 주석 처리한다.

## 상단에 '개발용 빌드입니다'라고 적힌 빨간색 막대가 표시된다.

서버를 공개할 때는 반드시 production 빌드를 사용해야 합니다.

제품 빌드로 설정하려면 환경 변수를 `NODE_ENV=production`으로 설정하고 `npm run build && npm start`를 실행합니다.

## 신규 등록 불가

API에 접속할 수 없는 것 같습니다.
`default.yml`의 시작 부분인 `url:`이 제대로 설정되어 있는지 확인합니다.
Node.js의 버전과 설치 설정도 다시 한 번 꼼꼼히 확인해 봅시다.

또한 `default.yml`이 제대로 작성되어 있습니까?

## 타임라인 표시 문제 발생, 실시간으로 TL이 업데이트되지 않음

타임라인 불러오기에 실패하는 경우, mongoDB나 PostgreSQL의 버전이 오래된 것일 수 있습니다.
PostgreSQL은 가급적 v13으로 업데이트해 주세요.

redis의 연결도 확인하는 것이 좋습니다. [→ redis에 접속할 수 없나요? 참조](#redis에 연결할 수 없음)

## 영원히 '재접속 중'이라고 오른쪽 하단에 표시되고, 실시간으로 TL이 업데이트되지 않는다.

프록시를 이용하고 있다면, 그것이 WebSocket 통신을 방해하고 있을 가능성이 있습니다.

## 오브젝트 스토리지 사용 시 오류 발생

오브젝트 스토리지의 권한 설정이 엄격하게 설정되어 있을 수 있습니다.'누구나 파일(객체)을 가져올 수 있음'으로 권한을 설정해 보시기 바랍니다.
또한, `default.yml`을 다시 한 번 확인해보시기 바랍니다.

### S3 example (with CDN, custom domain)

S3 example (with CDN, custom domain)은 AWS의 기본 도메인이 아닌 자체 도메인으로 스토리지를 공개하고 싶은 경우의 설정입니다.
endpoint와 공개 도메인이 동일한 서비스의 경우 S3 example처럼 `baseUrl`은 명시하지 않아도 되며, 또한 region 개념이 없는 서비스의 경우 region 라인은 필요하지 않습니다.

### S3 호환 서비스 설정

Misskey에서는 오브젝트 스토리지 연결에 [aws-sdk](https://www.npmjs.com/package/aws-sdk)를 이용하고 있습니다.
아마존 S3와 호환되는 오브젝트 스토리지라면 사용할 수 있습니다.

각 서비스/소프트웨어의 설명서를 잘 읽고 설정해 보세요.

### 로딩이 끝나지 않음

Cloudflare를 사용하는 경우, Rocket Loader 또는 Auto Minify가 활성화되어 있는지 확인하십시오.활성화된 경우 비활성화하면 해결될 수 있습니다.

---

# 전혀 해결되지 않은 경우

다음 순서를 시도해 보세요.

1. Misskey의 문서를 잘 읽는다.
2. 구글에서 검색해 본다.
3. [Misskey 저장소의 Issues](https://github.com/misskey-dev/misskey/issues)를 검색해 본다(동일한 오류가 발생하거나, Misskey의 버그일 가능성도 있습니다).
4. 검색을 해도 잘 안 나오면 전문가에게 물어보세요.
  1. [Misskey Discord 서버（영어/일본어）](https://discord.gg/P4yYqYBjEp)등에 물어보기
  2. 개발자([aqz](https://p1.a9z.dev/@aqz)나 shuiro)에게 리플이나 직접 글을 보내 물어보기
