---
title: "데이터베이스 설계 | 8. SQL 2"
description: "IN : 부속 질의문의 결과 값들 중 하나라도 일치하는 것이 있으면 검색 조건이 참(집합의 ∊)  JOIN : 두 개의 테이블의 같은 attribute / IN : 서브 쿼리를 이용해서 / EXISTS : correlation을 이용해"
pubDate: 2024-05-27
updatedDate: 2024-12-26
tags: ["Database"]
category: "✏️ Study"
---
## 1. Nested Queries(중첩 쿼리)

- IN : 부속 질의문의 결과 값들 중 하나라도 일치하는 것이 있으면 검색 조건이 참(집합의 ∊)
- JOIN : 두 개의 테이블의 같은 attribute / IN : 서브 쿼리를 이용해서 / EXISTS : correlation을 이용해

## 2. Division in SQL(나눗셈)

- 이중 부정을 해서 구함(ex. 예약 받지 않은 배가 없다 = Sailors S such that … there is no boat B without…

## 3. Set-Comparison Operators(비교 연산자)

- op ANY : 임의 중에서 하나만 참이여도 참
- op ALL : 모두 참이여야 참

## 4. Aggregate Operators

```sql
COUNT (*)
COUNT([DISTINCT] A)
SUM([DISTINCT] A)
AVG([DISTINCT] A)
MAX(A)
MIN(A) single column
```

- 특정 속성 값을 통계적으로 계산한 결과를 검색
- 널인 속성 값은 제외하고 계산
- SELECT 절이나 HAVING 절에서만 사용 가능

## 5. GROUP BY and HAVING

```sql
SELECT [DISTINCT] target-list 
FROM relation-list	
[WHERE] qualification
[GROUP BY] grouping-list
[HAVING] group-qualification
```

- FROM → WHERE → GROUP BY → HAVING
- GROUP BY절에 나오는 속성을 SELECT절에 작성하는 것이 좋음(GROUP BY절에 없는 건 SELECT절에 사용 X)
- GROUP을 나누는 기준이 되는 속성을 SELECT절에 작성하지 않아도 실행은 되지만 어떤 그룹에 대한 검색 결과인지를 결과 테이블에서 확인하기 어렵기 때문

## 6. ORDER BY

- ascending order
    
    ```sql
    SELECT …
    FROM …
    GROUP BY …
    ORDER BY …
    ```
    
- descending order
    
    ```sql
    SELECT …
    FROM …
    GROUP BY …
    ORDER BY … DESC
    ```
