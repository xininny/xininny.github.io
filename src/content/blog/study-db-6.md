---
title: "데이터베이스 설계 | 6. 관계 대수 부가 연산자와 질의 예"
description: "Rename (ρ)      관계 대수식의 결과에 이름을 붙일 수 있고, 따라서 참조할 수 있다     ρx(A1, A2, …, An)(E)     ⇒ 식 E의 결과를 X라는 관계 이름으로 반환하고 속성 이름을 A1, A2, …, An으로 변경      Assignme"
pubDate: 2024-05-25
updatedDate: 2024-12-26
tags: ["Database"]
category: "✏️ Study"
---
## 부가적인 관계 대수 연산

- Rename (ρ)
    - 관계 대수식의 결과에 이름을 붙일 수 있고, 따라서 참조할 수 있다
    ρx(A1, A2, …, An)(E)
    ⇒ 식 E의 결과를 X라는 관계 이름으로 반환하고 속성 이름을 A1, A2, …, An으로 변경
    - Assignment (←) : 오른쪽에 있는 값을 왼쪽으로 치환
    - Aggregate Functions (avg, min, max, sum, count)
        - Decision-making operator
        - Compresses groups of rows into calculated values
        - Simple statistical (aggregate) function
        - Not part of original relational algebra
    - Aggregate operation in relational algebra$G_1, G_2, \cdots, G_n^{g} \quad F_1(A_1), F_2(A_2), \cdots, F_n(A_n)^{(E)}$
    (g는 Calligraphic G)
        - E는 임의의 관계 대수식, Fi는 집합 함수, Ai는 속성 이름, G1, G2, …, Gn은 그룹화할 속성의 목록(공백 가능)
- Modification of the Database
    - 데이터베이스의 내용을 수정할 수 있음
    - Deletion : 선택된 튜플이 제거됨(r<-r-E, r은 관계형이고 E는 관계 대수형 쿼리), 특정 특성의 값만 삭제할 수 X (전체 튜플만 삭제할 수 있음)
    - Insertion : 조건을 만족하는 투플을 원래 릴레이션에 추가(r<-r U E)
    - Updating : 튜플의 모든 값을 변경하지 않고 튜플의 값을 변경(r<-πF1, F2, …, Fi(r))
