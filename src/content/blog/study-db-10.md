---
title: "데이터베이스 설계 | 10. 데이터베이스 보안과 권한 관리"
description: "데이터베이스에 저장된 데이터(조직 내에 여러 사용자들이 공유해 사용) → 허락하지 않은 외부인이 데이터를 유출하거나 손상 → 조직에는 치명적인 손실 발생 →조직에서 허가된 사용자만 데이터베이스에 접근할 수 있도록 통제 → 보안을 유지하는 일이 중요  물리적 환경에 대한"
pubDate: 2024-05-29
updatedDate: 2024-12-26
tags: ["Database"]
category: "✏️ Study"
---
## 1. 데이터베이스 보안

- 데이터베이스에 저장된 데이터(조직 내에 여러 사용자들이 공유해 사용)
→ 허락하지 않은 외부인이 데이터를 유출하거나 손상 → 조직에는 치명적인 손실 발생
→조직에서 허가된 사용자만 데이터베이스에 접근할 수 있도록 통제 → 보안을 유지하는 일이 중요
- 물리적 환경에 대한 보안
    - 데이터베이스에 물리적으로 손실을 발생시킬 위험으로부터 보호(ex.홍수, 화재)
- 권한 관리를 통한 보안
    - 접근이 허락된 사용자만 부여된 권한 내에서 데이터베이스 사용
    - 계정이 발급된 사용자만 데이터베이스에 접근할 수 있도록 통제
    - 사용자별로 데이터베이스의 사용 범위와 수행 가능한 내용 제한
- 운영 관리를 통한 보안
    - 접근이 허락된 사용자가 부여된 권한 내에서 데이터베이스 사용 → 실수 등의 이유로 데이터 무결성 위반
    - 데이터 무결성을 유지하기 위해 → 올바른 제약 조건 정의 + 정의된 제약 조건을 위반하지 않도록 통제

## 2. 데이터베이스와 암호화

- 데이터베이스 시스템의 권한 관리를 통한 보안만으로 데이터를 보호하기에 충분하지 않을 때 데이터 암호화함
- 대칭 암호화(Symmetric Encryption)
    - 암호화 키와 복호화 키가 같은 방
    - 대칭 암호화 알고리즘
        - DES (Data Encryption Standard) : 64비트의 블록 암호화 알고리즘
        - AES (Advanced Encryption Standard) : 128비트의 블록 암호화 알고리즘
    - 비대칭 암호화(Asymmetric Encryption)
        - 공개 키 암호화(공개 키 + 개인 키(Private Key))
        - 비대칭 암호화 알고리즘
            - RSA : 최초 상용화, 대표적인 공개 키 암호화 알고리즘

## 3. 권한(Authorization) 관리

- 데이터베이스의 일부에 대한 권한 부여 양식
    - Read : 읽기는 허용하지만 수정은 불가능
    - Update : 수정은 허용하지만 데이터 삭제는 허용 X
    - Insert : 새 데이터의 삽입은 허용하지만 기존 데이터의 수정은 허용 X
    - Delete : 데이터 삭제 허용
- 데이터베이스 스키마 수정을 위한 권한 부여 형태
    - Index : 인덱스 생성 및 삭제 허용
    - Alteration : 관계에서 속성 추가 또는 삭제 허용
    - Resources : 새 관계 생성 허용
    - Drop : 관계 삭제 허용
- Granting of Privileges (권한 부여)
    
    
    ![image.png](/images/study-db-10/0162.png)
    
    ![image.png](/images/study-db-10/0163.png)
    
    - 한 사용자에서 다른 사용자로 권한이 전달되는 과정은 권한 그래프로 나타낼 수 있음
    - 이 그래프의 노드는 사용자
    - 그래프의 루트는 데이터베이스 관리자(DBA)
    - loan 관계에 대한 업데이트 승인 그래프 고려하기
    - 모서리 Ui → Uj는 사용자 Ui가 Uj에게 대출에 대한 업데이트 권한을 부여했음을 나타냄
    - 권한 부여 그래프의 모든 모서리는 데이터베이스 관리자로부터 시작되는 일부 경로의 일부여야 함
- Revoking of Privileges(권한 회수)
    - DBA가 U1의 승인을 취소하는 경우:
        - U1은 더 이상 권한이 없으므로 U4에서 부여를 취소해야 함
        - U5는 DBA에서 U2를 통해 다른 권한 부여 경로를 가지고 있으므로 U5에서 부여를 취소해서는 안됨
- Authorization Specification in SQL
    
    ```sql
    grant <privilege list>
    on <relation name or view name>
    to <user list>
    ```
    
    - <user list>는 : 사용자 ID, 공개로 설정하여 모든 유효한 사용자에게 권한을 부여
    - 권한을 부여하는 사람은 지정된 항목에 대한 권한을 이미 보유하고 있거나 데이터베이스 관리자
- Privileges in SQL
    - SELECT : 관계에 대한 읽기 액세스 또는 보기를 사용하여 쿼리하는 기능을 허용
        - 사용자 U1, U2, U3에게 브랜치 관계에 대한 선택 권한을 부여
        - grant select on branch to U1, U2, U3
            - 어떤 권한을, select 권한을, branch 릴레이션에 대해서, U1, U2, U3에게
            - 사용자 U1, U2, U3가 branch 릴레이션에 대해서 SELECT = 검색 연산을 허락 받음
    - INSERT : 튜플 삽입 기능
    - DELETE : 튜플 삭제 기능
    - UPDATE : 튜플 업데이트 기능
    - REFERENCES : 관계를 만들 때 외래 키를 선언하는 기능
    - ALL PRIVILEGES : 허용되는 모든 권한에 대한 약식으로 사용
- Granting Authorization in SQL (SQL에서 권한 부여)
    - 테이블을 구성하는 속성들 중 일부 속성만 수정 또는 검색 권한 부여
    - grant update (rating) on sailors to kim;
    권한             속성              릴레이션    사용자
    ⇒ kim이라는 사용자에게 sailors 테이블에 rating이라는 속성을 업데이트할 수 있는 권한을 부여함
    - 시스템 권한 : 객체가 아닌 데이터베이스 관리와 관련
        - grant create table to Kim;
        ⇒ DDL 명령어를 시스템 권한으로 사용
- Privilege to grant privileges (권한을 부여할 수 있는 권한)
    - with grant(or admin) option : 권한을 부여받은 사용자가 다른 사용자에게 권한을 전달할 수 있음
    - grant select on branch to U1 with grant option;
    ⇒ 유저1이 또 다른 제 3의 유저에게 select 권한을 부여할 수 있도록 해주는 기능 의미
- Revoking Authorization in SQL (SQL에서 권한 취소)
    - revoke <privilege list>
    on <relation name or view name>
    from <user list>
    ⇒ 어떤 유저로부터 부여했던 릴레이션이나 뷰에 대해서 권한 회수
    - 권한이 취소된 사용자가 다른 사용자에게 부여한 권한을 처리하는 방법
        - revoke 권한 on 객체from사용자
            - CASCADE : 연쇄적으로 같이 하는 것
            - RESTRICT : 어떤 제한을 가하는 것
    - 시스템 권한 취소
    ⇒ revoke create table from Hong;(사용자 Hong에게 부여된 테이블 생성 권한 취소)
