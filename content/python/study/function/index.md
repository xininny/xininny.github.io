---
emoji: 𝐏
title: Python | 1. 함수, 내장함수, Print 함수
date: '2024-02-14 00:00:00'
author: xininny
tags: Python 함수 내장함수 Print
categories: Python
---

파이썬에는 다양한 종류의 함수가 있다.

- 내장 함수
- 외장 함수
- 사용자 정의 함수@

<br>

## 1. 파이썬 내장 함수

내장 함수란 파이썬 인터프리터가 설치될 때 별도의 작업없이 바로 사용 가능한 함수들이다.

```python
# 간단한 내장 함수들

print(abs(-1)) # 절대값
print(max(1,2,10,4,40,1)) # 최대값
print(min(1,4,2,10, 5,2)) # 최소값
print(pow(2,10)) # 지수승
print(round(2.4)) # 반올림
print(round(2.6))
print(round(3.1415, 1)) # 소수점 아래에 1자리만 남기고 반올림
print(round(3.1415, 3)) # 소수점 아래에 3자리만 남기고 반올림
print(round(3.1415, 4))
```

```PowerShell
1
40
1
1024
2
3
3.1
3.142
3.1415
```

아래 링크를 접속하면 내장함수 이름들을 볼 수 있다.

- <a href="https://docs.python.org/ko/3/library/functions.html" target="_blank"> Python library functions </a>

- <a href="https://wikidocs.net/32" target="_blank"> 점프 투 파이썬 내장 함수 </a>
- 참고
  - 추상화 : 복잡한 세부사항을 숨기고, 주요 기능에만 집중할 수 있게 해주는 개념 (변수, 함수, 객체)

<br>

## 2. Print 함수

### 1) 주석

Sharp(샵, **#**) 기호로 시작되는 줄은 주석이다.  
주석은 프로그램의 실행과는 상관없이 코드의 설명 등에 도움되는 정보를 기입하는 문장이다.

```python
# Sharp(샵) 기호로 시작되는 줄은 주석이다.
# 즉, 지금 읽고 있는 이 줄들은 모두 주석이다.
```

### 2) print( )

print( ) 함수는 괄호( ) 안의 **내용물(파라미터)을** 화면에 출력해준다.

print( ) 함수를 통해 **문자열**도 출력할 수 있다.  
print( ) 함수의 괄호 내부에 출력할 내용을 적어주면 되기 때문이다.  
" " 또는 ' '로 묶인 부분을 문자열(string)이라고 한다.  
문자열은 향후에 자세하게 설명한다.

```python
# 아래는 1이라는 숫자값을 출력한다.
print(1)

# 아래는 Hellow World!라는 문자열을 출력한다.
print('Hello World!')

# 숫자 1을 출력하고 싶다면
print(1)

# 문자열 "1"을 출력하고 싶다면
print("1")

# 위의 2개의 출력 결과는 화면 상에서는 동일하다,
# 숫자 1과 문자열 "1"은 컴퓨터 내부적으로 저장되는 형식이 다를 뿐이다.
print(1 + 1)
```

```PowerShell
1
Hello World!
1
1
2
```

<br>

print( ) 함수의 괄호 내부에 적는 값을 **파라미터**(parameters, 매개 변수)라고 한다.  
print( ) 함수는 파라미터가 없으면 아무것도 출력되지 않고 줄만 바뀐다.

print( ) 함수는 출력한 후 자동으로 줄을 바꿔준다.  
만약 줄을 바꾸고 싶다면 문자열 내에 \n 기호를 붙인다.  
**\n** : 줄을 바꾸어주는 역할

만약 줄을 바꾸고 싶지 않다면 **end=""** 를 붙인다.

```python
# 아래는 1 비어있는 줄 2 를 출력한다.
print(1)
print()
print(2)

# 만약 줄을 바꾸고 싶다면
print("Hello", end="\n") # 문자열 내에 \n 기호는 줄을 바꾸어주는 역할
print("Python")

# 만약 줄을 바꾸고 싶지 않다면
print("first", end="")
print("second")

# 위의 사항에서 무엇을 알 수있을까?
# print() 함수에는 파라미터가 1개 또는 2개(사실은 더 있을 수 있다)가 될 수 있다는 사실
```

```PowerShell
1

2
Hello
Python
firstsecond
```

<br>

수식 계산은 계산이 완료된 최종 결과가 출력된다.
print( ) 함수를 실행하기 전에, 파라미터를 먼저 계산하고, 계산된 결과가 print( ) 함수에게 전달된다.

```python
print(3+7*5)
```

```PowerShell
38
```

<br>

여러 값을 **콤마**(,)로 구분해서 출력할 수 있다.

문자열은 **큰 따옴표**(" ")와 **작은 따옴표**(' ') 모두 사용할 수 있다.

필요한 경우는 큰 따옴표 내부에 작은 따옴표를, 작은 따옴표 내부에 큰 따옴표를 '문자'의 의미로 사용할 수 있다.

```python
# 여러 값을 콤마(,)로 구분해서 출력
print("sum is:", 3+7)

# 큰 따옴표와 작은 따옴표 모두 사용
print('Hello')
print("Hello")

# 큰 따옴표 내부에 작은 따옴표, 작은 따옴표 내부에 큰 따옴표
print("This is Jung's Book.")
print('This is Jung"s Book.')
```

```PowerShell
sum is: 10
Hello
Hello
This is Jung's Book.
This is Jung"s Book.
```

<br>

하지만 **에러가 나는 경우**도 있다.

```python
# 어디가 문자열의 끝인지 불 명확하기 때문
print('This is Jung's Book.')
```

```PowerShell
File "<ipython-input-13-5ff4166757df>", line 3
    print('This is Jung's Book.')
                        ^
SyntaxError: invalid syntax
```

<br>

**여러줄에 걸친 긴 문자열**도 만들 수 있다.

```python
# 여러줄에 걸친 긴 문자열
print("""여러 줄에 걸친
            문자열은 큰 따옴표로
       감쌀수 있습니다.""")

print('''여러 줄에 걸친
            문자열은 작은 따옴표로도
       감쌀수 있습니다.''')
```

```PowerShell
여러 줄에 걸친
            문자열은 큰 따옴표로
       감쌀수 있습니다.
여러 줄에 걸친
            문자열은 작은 따옴표로도
       감쌀수 있습니다.
```

```toc

```
