---
title: "데이터베이스 설계 | 9. SQL 3"
description: "Join : 조인 조건을 사용하여 일치하는 행  Left outer join : 왼쪽 테이블에서 매치되지 않는 행 + 조인 조건을 사용하여 일치하는 행  Right outer join : 조인 조건을 사용하여 일치하는 행 + 오른쪽 테이블에서 매치되지 않는 행  Ful"
pubDate: 2024-05-28
updatedDate: 2024-12-26
tags: ["Database"]
category: "✏️ Study"
---
## 1. Inner Join

## 2. Outer Joins

- Join : 조인 조건을 사용하여 일치하는 행
- Left outer join : 왼쪽 테이블에서 매치되지 않는 행 + 조인 조건을 사용하여 일치하는 행
- Right outer join : 조인 조건을 사용하여 일치하는 행 + 오른쪽 테이블에서 매치되지 않는 행
- Full outer join : 왼쪽 테이블에서 매치되지 않는 행 + 조인 조건을 사용하여 일치하는 행 + 오른쪽 테이블에서 매치되지 않는 행
- Outer Joins (Oracle)
    - Left outer join
        
        ```sql
        SELECT sid, bid
        FROM Sailors NATURAL LEFT OUTER JOIN Reserves;
        SELECT S.sid, R.bid
        FROM Sailors S LEFT OUTER JOIN Reserves R ON S.SID = R.SID;
        SELECT S.sid, R.bid
        FROM Sailors S, Reserves R
        WHERE S.sid = R.sid(+);
        ```
        
        - join ~ on 한 묶음으로 사용
        - where 는 join ~ on 외에 추가적인 조건이 있을 때 사용
    - Full outer join
        
        ```sql
        SELECT sid, bid
        FROM Sailors NATURAL FULL OUTER JOIN Reserves;
        SELECT S.sid, R.bid
        FROM Sailors S FULL OUTER JOIN Reserves R ON S.SID = R.SID;
        SELECT S.sid, R.bid
        FROM Sailors S, Reserves R
        WHERE S.sid(+) = R.sid(+); => 양쪽 + 는 오류
        Outer Joins (MySQL)
        ```
        
- Outer Joins (MySQL)
    - Left outer join
        
        ```sql
        SELECT sid, bid
        FROM Sailors NATURAL LEFT OUTER JOIN Reserves;
        SELECT S.sid, R.bid
        FROM Sailors S LEFT OUTER JOIN Reserves R ON S.SID = R.SID;
        SELECT S.sid, R.bid
        FROM Sailors S, Reserves R
        WHERE S.sid = R.sid(+); => + 는 오류
        ```
        
    - Full outer join : Full outer join 지원 X-> UNION으로 두 SELECT문의 결과 데이터 결합
        
        ```sql
        SELECT S.sid, R.bid
        FROM Sailors S LEFT OUTER JOIN Reserves R ON S.SID = R.SID
        UNION
        SELECT S.sid, R.bid
        FROM Sailors S RIGHT OUTER JOIN Reserves R ON S.SID = R.SID;
        ```
        

## 3. Views

- 사용자에게 접근이 허용된 자료만 제한적으로 보여주기 위해 하나 이상의 기본 테이블로부터 유도된 이름을 가진 가상 테이블
- 투플들의 집합보단 정의를 저장함
- 외부스키마에 해당
    
    ```sql
    CREATE VIEW Students(sid, sname, gpa)
    	AS SELECT sid, sname, gpa
    		FROM Snames SN, Sgpas SG
    		WHERE SN.sid = SG.sid;
    ```
    
- 생성한 뷰에 삽입이나 수정 연산을 할 때, 뷰의 정의 조건을 위반하면 수행되지 않도록 함(ex. WITH CHECK OPTION; 을 마지막에 붙임)
- 장점 : 질의문을 좀 더 쉽게 작성할 수 있음, 데이터의 보안 유지에 도움, 데이터를 편리하게 관리 가능
- 뷰 업데이트
    
    ```sql
    insert into branch_loan
    values (‘L-37’, ‘Perryridge’);
    ```
    
    - 뷰로 구성된 내용에 대한 삽입, 삭제, 갱신 연산에는 제약이 따름
    - 기초 테이블의 기본 키가 포함되지 않은 뷰를 통해 행을 삽입하려고 하면 삽입? → rejected
    - 집계 연산을 사용하지 않고 선택 및 투영만 사용하여 단일 기준 테이블에 정의된 뷰에만 업데이트를 지정할 수 있음
        - 집계 함수로 계산된 값은 기본 테이블이 원래 포함하고 있던 내용이 아니라 새로 계산된 값
        - 삽입, 수정, 삭제를 할 때 기본 테이블의 어떤 투플을 어떻게 변화시켜야 하는지 명확하지 X
    - GROUP BY절을 포함하여 정의된 뷰는 변경 X
    - DISTINCT 키워드를 포함하여 정의된 뷰는 변경 X
- 삭제
    - 하나의 뷰를 삭제하면 그 뷰를 기초로 정의된 다른 뷰도 자동으로 삭제
    - 명령어 : DROPVIEW
    - 테이블에 뷰가 있는 경우 테이블 삭제는 어떻게 처리?
        
        ```sql
        DROP TABLE students RESTRICT;
        DROP TABLE students CASCADE;
        ```
        

## 4. Embedded SQL (내장 혹은 삽입 SQL)

- 일반 응용 프로그램에 SQL을 삽입하여 데이터 베이스 자료를 이용하고 다양한 조작을 할 수 있도록 한 것
- EXEC SQL 문으로 시작하여 세미콜론(;)으로 종료
- 호스트 언어에 데이터 베이스의 자료를 불러와 기억하기 위한 호스트 변수가 필요
- 호스트 변수를 사용하려면 BEGIN DECLARE SECTION ~ END DECLARE SECTION을 통해 선언되어야 함
- 호스트 변수는 구분을 위해 콜론(:)을 변수명 앞에 붙임
- 데이터 베이스 속성의 데이터 타입과 호스트 변수의 데이터 타입은 같아야 함
- Cursors (커서)
    - 일반 SQL문은 실행 후 여러 자료를 얻을 수 있지만 내장 SQL문은 하나의 자료만 얻을 수 있음
    - 커서 : 투플들의 집합을 처리하는 데 사용되는 포인터 역할
    - 관계 또는 쿼리문(관계를 생성하는)에 커서를 선언할 수 있음
    - 커서를 열고 모든 튜플이 검색될 때까지 반복적으로 튜플을 가져온 다음 커서를 이동할 수 있음
    - 커서가 가리키는 튜플을 수정/삭제할 수도 있음
        
        ```sql
        int main( ) {
        	EXEC SQL BEGIN DECLARE SECTION
        		char c_sname[20]; short c_minrating; int c_age;
        	EXEC SQL END DECLARE SECTION
        	c_minrating = random( );
        	EXEC SQL DECLARE sinfo CURSOR FOR
        		SELECT S.sname, S.age
        		FROM Sailors S
        		WHERE S.rating > :c_minrating
        		ORDER BY S.sname;
        do {
        EXEC SQL FETCH sinfo INTO :c_sname, :c_age;
        	printf(“%s is %d years old\n”, c_sname, c_age);
        } while (SQLSTATE != ‘2000’);
        EXEC SQL CLOSE sinfo;
        }
        ```
        

## 5. System Catalog

- 데이터 베이스에 포함된 다양한 데이터 객체에 대한 정보들을 유지, 관리하기 위한 시스템 데이터 베이스
- DDL(데이터정의어)로 구성되는 기본 테이블, 뷰, 인덱스, 제약조건 등의 데이터 베이스 구조 및 통계정보를 저장함 → 데이터사전 → 카탈로그에 저장된 정보는 데이터에 대한 데이터를 의미 → 메타데이터
- 시스템 테이블로 구성되어 있어 일반 이용자도 SQL을 이용하여 내용을 검색해 볼 수 있음
- 카탈로그를 갱신하는 것은 허용 X
- DBMS가 스스로 생성하고 유지
- 데이터 사전에 있는 데이터에 실제로 접근하는데 필요한 위치정보는 데이터 디렉터리에서 관리
- 데이터 사전은 사용자가 접근할 수 있지만 데이터 디렉터리는 시스템만 접근 가능
- SELECT * FROM USER_OBJECTS;
테이블, 뷰, 제약 조건, 인덱스, 프로시저, 트리거 등 검색
- SELECT * FROM USER_TABLES;
생성된 테이블(EMP, DEPT, PRICE 등) 검색
- SELECT * FROM USER_VIEWS;
뷰 이름, 검색 범위(컬럼들), 컬럼이 참조한 테이블 검색
- SELECT * FROM USER_CONSTRAINTS;
제약 조건 이름, 적용된 테이블, 상태((비)활성화 유무) 검색
- SELECT * FROM USER_INDEXES;
인덱스 이름, 적용된 테이블 검색

## 6. Triggers

- DB에 지정된 변경 사항이 발생하면 DBMS에서 자동으로 호출하는 프로시저
- 일반적으로 DBA(관리자)가 지정
- DB를 모니터링하는 daemon으로 생각할 수 있음
- 활성 데이터베이스 : 연결된 트리거 세트가 있는 DB
- 세 부분으로 구성됨
    - Event : 트리거를 활성화하는 DB의 변경 사항
    - Condition : 트리거가 활성화될 때 실행되는 쿼리 또는 테스트
    - Action : 트리거가 활성화되고 조건이 참일 때 실행되는 프로시저
    
    ```sql
    CREATE TRIGGER init_count BEFORE INSERT ON Student /* Event */
    	DECLARE
    		count INTEGER;
    	BEGIN
    		count := 0; /* Action */ 
    	END
    ```
    
    ```sql
    CREATE TRIGGER incr_count AFTER INSERT ON Student /* Event */
    	WHEN(new.age < 18) */** Condition */
    	FOR EACHROW 
    	BEGIN
    		count := count + 1; */** Action */
    	END
    ```
    
- 쿼리 처리
    - 구문 분석 및 번역(Parsing and translation)
    - 최적화(Optimization)
    - 평가(Evaluation)

![image.png](/images/study-db-9/0190.png)
