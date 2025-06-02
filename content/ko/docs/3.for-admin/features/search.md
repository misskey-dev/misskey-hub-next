# 노트 검색

Misskey에는 노트의 검색 기능이 있습니다.활성화하는 것으로 노트의 검색이 가능하게 됩니다.

:::tip

검색 기능은 기본 비활성화돼있습니다.
이용하는 경우는, 역할의 '노트 검색 이용'을 활성화해주십시오.

:::

## 서포트하고 있는 검색 엔진

Misskey는 노트 검색에 사용하는 알고리즘을 여럿 준비했습니다.서버의 규모나 요구에 따라 교체할 수 있습니다.

- sqlLike ... PostgreSQL의 표준 기능을 사용해 검색합니다.(기본값)
  - 내장 데이터베이스 기능을 사용하기에 편리합니다.
  - 데이터 사용량이 증가하면 검색에 시간이 걸릴 수 있습니다.

- sqlPgroonga ... 전체 문장 검색 엔진인 [Pgroonga](https://pgroonga.github.io)를 사용해 검색합니다.
  - Pgroonga의 설치가 필요합니다.
  - sqlLike보다 빠른 속도의 검색이 가능합니다.

- meilisearch ... 전체 문장 검색 엔진인 [Meilisearch](https://www.meilisearch.com)를 사용해 검색합니다.
  - Meilisearch의 설치가 필요합니다.
  - sqlLike보다 빠른 속도의 검색이 가능합니다.
  - 검색 대상 노트는 공개 범위가  '퍼블릭' 혹은 '홈'입니다.팔로워 한정 게시도 포함하고 싶은 경우 'sqlLike' 혹은 'sqlPgroonga'를 사용할 필요가 있습니다.

검색 엔진을 변경할 경우에는 설정 파일의 'fulltextSearch'의 'provider'를 교체해 Misskey 프로세스를 재기동해주십시오.

## Pgroonga를 사용하기

### Pgroonga의 설치

:::warning

작업 전에 데이터베이스의 백업을 권장드립니다.\
또, Misskey를 정지한 뒤 작업을 시작해주십시오.

:::

Ubuntu 22.04, PostgreSQL 15의 환경에 Pgroonga를 설치하는 예시입니다.

상세는 [공식 PostgreSQL용 설치 방법](https://pgroonga.github.io/ja/install/ubuntu.html)를 확인해주십시오.

```sh
sudo apt install -y -V ca-certificates lsb-release wget
wget https://packages.groonga.org/ubuntu/groonga-apt-source-latest-$(lsb_release --codename --short).deb
sudo apt install -y -V ./groonga-apt-source-latest-$(lsb_release --codename --short).deb
sudo wget -O /usr/share/keyrings/pgdg.asc https://www.postgresql.org/media/keys/ACCC4CF8.asc
(echo "Types: deb"; \
   echo "URIs: http://apt.postgresql.org/pub/repos/apt"; \
   echo "Suites: $(lsb_release --codename --short)-pgdg"; \
   echo "Components: main"; \
   echo "Signed-By: /usr/share/keyrings/pgdg.asc") | \
    sudo tee /etc/apt/sources.list.d/pgdg.sources
sudo apt update
sudo apt install -y -V postgresql-15-pgdg-pgroonga
```

MeCab 베이스 토크나이저를 사용하고 싶은 경우에는 아래도 실행합니다.

```sh
sudo apt install -y -V groonga-tokenizer-mecab
```

### Pgroonga의 활성화

다음으로 PostgreSQL에 로그인합니다.

```sh
sudo -u postgres psql
```

로그인이 됐다면 Misskey 데이터베이스를 선택합니다.

```sh
\c "mk1"
```

PGroonga를 활성화합니다.

```sh
CREATE EXTENSION pgroonga;
```

PGroonga용 인덱스를 작성합니다.

:::warning

인덱스 작성에는 시간이 걸립니다.충분한 작업 시간을 확보해주십시오.

:::

```sh
CREATE INDEX idx_note_text_with_pgroonga ON note USING pgroonga (text);
```

완료되면 'exit'라고 입력한 뒤 PostgreSQL에서 로그아웃합니다.

### 검색 엔진의 변경

Misskey의 설정 파일을 편집합니다.\
'fulltextSearch'를 'sqlPgroonga'로 변경해주십시오.

```sh
fulltextSearch:
  provider: sqlPgroonga
```

Misskey 프로세스를 기동하고 노트의 검색이 가능하면 완료입니다.
