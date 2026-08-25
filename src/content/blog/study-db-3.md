---
title: "데이터베이스 설계 | 3. 관계 데이터 모델의 개념과 정의문"
description: "Relation : Schema, Instance      Schema : 속성의 이름, 타입, 각 컬럼, 무결성 제약 조건이라고명세      Instance : 행과 열로 구성된 투플들의 모임          row(투플)의 개수 = cardinality       "
pubDate: 2024-05-22
updatedDate: 2024-12-26
tags: ["Database"]
category: "✏️ Study"
---
## 1. 관계 데이터 모델

![image.png](/images/study-db-3/0185.png)

- Relation : Schema, Instance
    - Schema : 속성의 이름, 타입, 각 컬럼, 무결성 제약 조건이라고명세
    - Instance : 행과 열로 구성된 투플들의 모임
        - row(투플)의 개수 = cardinality
        - field(열)의 개수 = degree(차수) / arity
    - Relation이란 row나 투플의 모임(row는 서로 다 구별됨)

## 2. 릴레이션의 개념

- 릴레이션의 수학적 정의
    - 카티션프로덕트(곱집합)의 부분집합
    - 릴레이션의 개념적 정의 : 릴레이션 스키마 + 릴레이션 인스턴스
    - R ⊆ $D_1 \times D_2 \times ... \times D_n$ (단, $D_i$ : $i$번째 도메인)
    - 릴레이션 R : n개의 애트리뷰트로 구성된 $d_1, d_2, ..., d_n$의 집합
    - $d_i ∈ D_i, <i = 1, 2, ..., n_i>$ ($d_i$는 $D_i$에 속하는 $i$번째 애트리뷰트)

## 3. 릴레이션의 특성

- 한 애트리뷰트 내의 값들은 모두 같은 유형
- 애트리뷰트들의 순서는 중요하지 X
- 투플들의 순서는 중요하지 X
- 동일한 투플이 두 개 이상 존재하지 X ⇒ 키가 존재
- 한 투플의 각 애트리뷰트는 원자 값을 가짐 ⇒ 다중값(취미,직업)을 허용하지 X

## 4. 데이터베이스 키

![image.png](/images/study-db-3/0186.png)

- 릴레이션 키 : 각 투플을 고유하게 식별할 수 있는 하나 이상의 애트리뷰트들의 모임
- 슈퍼 키(Super Key) : 한 릴레이션 내의 특정 투플을 고유하게 식별하는 하나의 애트리뷰트 또는 애트리뷰트들의 집합
    - 유일성
    - 투플들을 고유하게 식별하는데 꼭 필요하지 않은 애트리뷰트들을 포함할 수 있음
- 후보 키(Candidate Key) : 각 투플을 고유하게 식별하는 최소한의 애트리뷰트들의 모임
    - 유일성 + 최소성
    - 모든 릴레이션에는 최소 한 개 이상의 후보 키가 있음
    - 두 개 이상의 복합 애트리뷰트로 이뤄질 수 있음
- 기본 키(Primary Key) : 한 릴레이션에 후보 키가 두 개 이상 있으면 설계자 또는 데이터베이스 관리자가 이들 중에서 하나를 기본 키로 선정함
    - 자연스러운 기본 키를 찾을 수 없는 경우에는 레코드 번호와 같이 인위적인 키 애트리뷰트를 릴레이션에 추가할 수 있음
    - 기본 키로 지정된 애트리뷰트들은 모든 투플에 대해 어느 때고 null 값을 가질 수 X
    - 유일성 + 최소성 + NotNull
- 대체 키(Alternate Key) : 기본 키가 아닌 다른 후보 키, 언제든지 기본 키로 대체할 수 있음
    - 기본 키 + 대체 키 → 후보 키
- 외래 키(Foreign Key) : 어떤 다른 릴레이션의 기본 키를 참조하는 애트리뷰트
    - 관계 데이터베이스에서 릴레이션들 간의 관계를 나타내기 위해서 사용됨
    - 외래 키가 되는 속성과 기본 키가 되는 속성의 이름은 달라도 됨
    - 외래 키는 참조되는 릴레이션의 기본 키와 동일한 도메인을 가져야 함
    - 자신이 속한 릴레이션의 기본 키의 구성 요소가 되거나 되지 않을 수 있음
    - 유형
        - 자체 릴레이션의 기본 키를 참조하는 외래 키
        - Null 값을 가질 수 있음
        - 다른 투플이 같은 값을 가질 수 있음
    - 기본 키가 구성 요소가 되는 외래 키
        - 참조 무결성 : 잘못된 데이터가 유입되면 DBMS가 체크해서 오류 메시지로 알림

## 5. Relational Query Languages

- Query languages : 데이터베이스에서 데이터를 조작 및 검색할 수 있도록 함
    - 대용량 데이터셋을 쉽고 효율적으로 접근하게 하기 위함
    - 논리에 기반
    - 최적화를 허용
    - 관계대수(Relational Algebra) : 절차적
    - 관계해석(Relational Calculus) : 비절차적

## 6. SQL 데이터 정의문

- 무결성 제약조건
- char(n), varchar(n), int, smallint, numeric(p, d), real/double precision, float(n)
- data, time, timestamp, interval
- 대용량 object
    - Blob(Binary large object) : 이진수로 된 데이터
    - Clob(Character large object) : 문자로 된 데이터
- 기본 테이블의 생성
    
    ```sql
    CREATE TABLE 테이블_이름(
    				속성_이름 데이터_타입[NOTNULL][DEFAULT기본_값],
    				[PRIMARY KEY(속성_리스트)],
    				[UNIQUE(속성_리스트)],
    				[FOREIGN KEY(속성_리스트) REFERENCES 테이블_이름(속성_리스트)]
    				[ON DELETE 옵션] [ON UPDATE 옵션],
    				[CONSTRAINT 이름] [CHECK(조건)]
    );
    ```
    
- 기본 테이블의 제거
    - `DROP TABLE Students` : 스키마 정보와 투플이 삭제됨(복원 가능)
    - `DROP TABLE Students (PURGE)` : 복원 불가능
- 기본 테이블의 변경
    - ALTER TABLE Student
    ADD firstYear int;                   : 속성 추가
    - ALTER TABLE Student
    DROP COLUMN firstYear;    : 속성 제거
    - ALTER TABLE 테이블_이름
    ADD CONSTRAINT 제약조건_이름 제약조건_내용;     :조건 추가
    - ALTER TABLE 테이블_이름
    DROP CONSTRAINT 제약조건_이름;      : 조건 제거
