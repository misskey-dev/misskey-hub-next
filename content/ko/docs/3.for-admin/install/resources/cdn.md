# CDN 설정

Misskey 서버를 공개할 때는 [Cloudflare](https://www.cloudflare.com/)와 같은 CDN을 사용할 것을 강력히 추천합니다.

CDN을 사용하면 다음과 같은 장점이 있습니다.

- 정적 콘텐츠를 캐싱할 수 있어 서버의 부하를 줄일 수 있습니다.
- 서버의 IP 주소가 노출되지 않아 DoS 공격 등을 완화할 수 있습니다.

## 캐시

Misskey Web은 완전히 정적이며, 작동을 위해 서버가 필요하지 않습니다.따라서 Misskey 웹 전체를 CDN에서 캐싱할 수 있습니다.Misskey Web은 완전히 정적이며, 작동을 위해 서버가 필요하지 않습니다.따라서 Misskey 웹 전체를 CDN에서 캐싱할 수 있습니다.Misskey API는 캐싱할 수 없습니다.

CDN에서 다음과 같이 설정해 주세요.

- `api/api/*`를 제외한 모든 요청을 캐시.

:::tip

Misskey를 업데이트할 때 캐시를 지울 필요가 없습니다.

:::
