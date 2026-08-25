---
title: "데이터베이스 설계 | 7. SQL 1"
description: "SELECT절 : 관계 대수의 project 연산에 해당"
pubDate: 2024-05-26
updatedDate: 2024-12-26
tags: ["Database"]
category: "✏️ Study"
---
## 1. Basic SQL Query

- SELECT절 : 관계 대수의 project 연산에 해당
    
    ```sql
    SELECT [DISTINCT] target-list
    FROM relation-list
    WHERE qualification
    ```
    
    - target-list : relation-list에 있는 관계의 속성 목록
    - DISTINCT : 중복 허용 X, Default(기본 값)은 중복을 제거하지 않음
- FROM절 : 관계 대수의 cartesian product 연산에 해당
    - relation-list : 관계 이름 목록(각 이름 뒤에 범위 변수가 포함될 수 있음)
- WHERE절 : 관계 대수의 select 연산에 해당
    - qualification : Attr op const or Attr1 op Attr2(Attr는 attribute, op는 연산자)
- 순서는 FROM → WHERE → SELECT

## 2. Expressions and Strings

- LIKE는 문자열 일치에 사용
    - 임의의 한 문자를 나타냄
    - 0개 이상의 임의 문자를 나타냄
- AS와 띄어쓰기
    - 두 방법 모두 `" "`를 사용하면 대, 소문자를 구별
    - 원래 테이블의 속성 이름이 실제로 바뀌는 것은 X

## 3. NULL

- IS NULL : 특정 속성 값이 널 값인지 비교
    
    ```sql
    SELECT S.name
    FROM Sailors S
    WHERE S.age IS NULL;
    ```
    
- IS NOT NULL : 널 값이 아님을 비교, 널 값과 다른 값을 비교하면 결과가 모두 거짓이 됨

## 4. UNION, INTERSECT, MINUS

- UNION : 중복된 거 제거하고 합침
- UNION ALL : 중복 허용
- INTERSECT, MINUS : 교집합, 차집합
