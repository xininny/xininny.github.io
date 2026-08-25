---
title: "데이터베이스 설계 | 4. 관계 데이터 모델의 제약과 조작문"
description: "데이터 검색(SELECT FROM WHERE)      SELECT  : 최종으로 검색하고 싶은 속성(은 모든 속성)     FROM : 어떤 릴레이션으로부터     WHERE : 어떤 조건을 만족하는지  데이터 삽입(INSERT INTO VALUES)      INS"
pubDate: 2024-05-23
updatedDate: 2024-12-26
tags: ["Database"]
category: "✏️ Study"
---
## 1. SQL 데이터 조작문

- 데이터 검색(SELECT FROM WHERE)
    - SELECT * : 최종으로 검색하고 싶은 속성(*은 모든 속성)
    FROM : 어떤 릴레이션으로부터
    WHERE : 어떤 조건을 만족하는지
- 데이터 삽입(INSERT INTO VALUES)
    - INSERT INTO : 해당 릴레이션에 삽입하겠다
    VALUES : 값
    - 테이블에 투플을 직접 삽입하는 방법(INSERT INTO, VALUES)
    - 부속 질의문을 이용해 삽입하는 방법(INSERT INTO, SELECT, FROM, WHERE)
- 데이터 삭제(DELETE FROM WHERE)
    - DELETE : 어떤 릴레이션으로부터(FROM) 어떤조건을(WHERE) 삭제
    - TRUNCATE TABLE : 테이블자체는 그대로 두고 해당 테이블의 모든 행이 제거되고 저장공간을 재사용가능하게함 (스키마는 살아있고 인스턴스만 없어짐)
- 데이터 갱신(UPDATE SET WHERE)
    - UPDATE : 어떤조건의(WHERE) 값을 어떻게 바꿔라(SET) 라고 어떤 릴레이션을 업데이트한다
- 데이터 갱신 : Case Statement
    
    ```sql
    UPDATE 000
    SET 0000 = CASE
    	WHEN 0000
    			THEN 0000
    			ELSE 0000
    	END;
    ```
    

## 2. Integrity Constraints (ICs)

- IC : 데이터베이스의 모든 인스턴스에 대해 참이어야 하는 조건(예 : 도메인 제약 조건)
    - IC는 스키마가 정의될 때 지정된다
    - 관계가 수정될 때 IC가 확인된다
- 관계의 합법적인 인스턴스는 지정된 모든 IC를 만족하는 인스턴스이다
    - DBMS는 불법 인스턴스를 허용하지 않아야 한다
- DBMS가 IC를 확인하면 저장된 데이터가 실제 의미에 더 충실해진다
    - 데이터 입력 오류도 방지할 수 있다

## 3. Entity Integrity (개체 무결성)

- 개체 무결성
    - 기본 테이블의 기본 키를 구성하는 어떤 속성도 NULL값을 가질 수 X
    - PRIMARY KEY
    UNIQUE
    대체키는 유일성만 만족하고 NULL이어도 됨

## 4. Referential Integrity (참조 무결성)

- 참조 무결성
    - 외래 키 값은 NULL이거나 참조 릴레이션의 기본 키 값과 동일해야 함
    - 즉, 릴레이션은 참조할 수 없는 외래 키 값을 가질 수 X
    - 외래 키 : 다른 관계의 튜플로 재귀하는데 사용되는 한 관계의 필드 집합
    - 외래 키를 넣는 명령어
        - FOREIGN KEY 000 REFERENCES 000

## 5. Enforcing Referential Integrity (참조 무결성)

- 어떤 투플을 삭제하려면?
    - 이를 참조하는 모든 등록된 튜플을 삭제
    - 참조되는 어떤 튜플 삭제 허용 안 함
    - 이를 참조하는 등록된 튜플의 000를 기본 000로 설정
    - '알 수 없음' 또는 '적용할 수 없음' 을 나타내는 특수 값 null로 참조하는 어떤 튜플의 000를 설정
    - 어떤 튜플의 기본 키가 업데이트된 경우에도 유사

## 6. Referential Integrity in SQL

- 삭제 및 업데이트에 대한 4가지 옵션 모두 지원
    - 기본 값은 아무 조치 없음(Default is NO ACTION)
        - 삭제/업데이트가 거부됨
    - CASCADE : 삭제된 튜플을 참조하는 모든 튜플도 삭제
    - SET NULL / SET DEFAULT
        - 참조 튜플의 외래 키 값 설정
        - SET DEFAULT를 지원하지 않는 DBMS도 있음
        - Update 할 때는 SET DEFAULT

## 7. ADD/DROP Constraints

- 테이블 생성 시 제약 조건을 적용하지 않았다면, 생성 이후에 필요에 의해서 제약 조건을 추가할 수 있음
    - ALTER TABLE 000
    ADD CONSTRAINT 000
    FOREIGN KEY 000 REFERENCES 000
- 테이블 생성 시 혹은 생성 이후에 부여했던 제약 조건을 삭제할 수 있음
    - ALTER TABLE 000
    DROP CONSTRAINT 000
