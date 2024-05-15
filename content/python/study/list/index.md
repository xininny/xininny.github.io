---
emoji: 𝐏
title: Python | 7. List 자료형
date: '2024-02-20 00:00:00'
author: xininny
tags: Python List 자료형
categories: Python
---

새로운 정보가 있을 때마다 변수를 새로 생성하는 대신,  
리스트(list)라는 자료형을 쓰면 하나의 변수만으로도 여러 개의 정보를 저장할 수 있다.@

<br>

## 1. 리스트 생성

리스트를 생성하는 방법으로 크게 2가지가 있다.

### 1) 리스트 리터럴(literal)을 사용하는 방법

파이썬에서는 상수라는 명칭을 사용하지 않지만 일단 리터럴(literal)은 상수라고 생각하면 된다

```python
# 리스트 리터럴을 사용하는 방법

a = []   # empty list 생성. 리스트는 대괄호로 표시한다.
b = [1, 2, 3] # 값을 초기에 설정하면서 list 생성

# [], [1,2,3]과 같은 객체들을 '리터럴(literal)'이라고 한다.
# 즉, 리스트의 리터럴이다.
# 1, 2, 3과 같은 객체들을 'integer literal'이라고 한다.

print(a)
print(b)
```

```PowerShell
[]
[1, 2, 3]
```

<br>

### 2) list( )함수(생성자)를 사용하는 방법

list는 list( )라는 이름의 함수가 있다. 이를 **리스트의 생성자**라고 한다.

```python
# 생성자를 사용하는 방법

# int, float, str 등과 같이 모든 자료형에는 자료형 이름과 동일한 이름의 함수가 있다

c = list() # list() 함수를 이용한 생성. empty 리스트가 생성된다.
d = list('abcde') # list 함수의 파라미터로 str 타입의 값을 주었다.

print(c)
print(d)
```

```PowerShell
[]
['a', 'b', 'c', 'd', 'e']
```

<br>

## 2. 리스트 항목 접근

리스트는 여러 개의 값을 가지고 있기에 **특정 위치의 값을 참조할 필요**가 있다.  
리스트의 특정 항목의 위치를 **대괄호**로 인덱스를 지정할 수 있다.  
리스트의 **첫번째 항목의 인덱스는 0**이다.  
인덱스 **-1은 뒤에서 1번째 값, 뒤에서부터의 순서는 -1부터 시작**한다.

```python
b = [1, 2, 3]
print(b)
print(b[0], b[1], b[2]) # 인덱스 값은 좌측에서 0부터 시작한다.

print(b[-1])
print(b[-2])
print(b[-3])
```

```PowerShell
[1, 2, 3]
1 2 3
3
2
1
```

<br>

리스트의 인덱스가 **범위를 벗어나면 에러가 발생**한다.

```python
print(b[4])

```

```powershell
---------------------------------------------------------------------------
IndexError                                Traceback (most recent call last)
<ipython-input-6-d326698b769d> in <module>()
      3
      4
----> 5 print(b[4])

IndexError: list index out of range
```

<br>

## 3. 리스트의 리스트(list of list)

리스트의 내부 항목을 리스트로 할 수 있다.  
즉, **리스트의 항목 각각이 또 리스트인 경우**이다.  
이를, list of list라고 한다.(2차원 리스트라고 생각하면 된다)

```python
e = [['a', 'b', 'c'],
     ['A', 'B', 'C']]

print(e)
print(e[0]) # 0번째 항목이 list이다.
print(e[0][0]) # 0번째 항목의 또 0번째 항목

print(type(e))
print(type(e[0][0]))
```

```powershell
[['a', 'b', 'c'], ['A', 'B', 'C']]
['a', 'b', 'c']
a
<class 'list'>
<class 'str'>
```

<br>

## 4. 자료형

파이썬의 리스트는 항목들이 동일한 자료형일 필요가 없다.  
이는 C나 Java 언어들의 배열과 다른 점이다.  
**파이썬의 리스트는 항목들이 서로 다른 자료형이어도 된다.**

이러한 융통성으로 인해 파이썬의 list는 실행 속도가 느리다는 단점이 있다.  
그래서 일반적으로는 잘 사용하지 않는 기능이지만  
단점을 극복하기 위해 numpy 같은 외부 라이브러리를 많이 사용한다.

```python
f = [1, 3.14, 'a', 'Python', [1,2,3]]
print(f)
```

```powershell
[1, 3.14, 'a', 'Python', [1, 2, 3]]
```

<br>

## 5. 리스트의 항목 수정

리스트의 항목을 수정하려면 **대입 연산자**를 이용하면 된다.

```python
b = [1, 2, 3]
print(b)

b[0] = 10
print(b)
```

```powershell
[1, 2, 3]
[10, 2, 3]
```

## 6. 리스트 삭제

**del** 키워드는 리스트에만 해당하는 것이 아니고, 해당 변수가 참조하고 있는 객체와의 연결을 끊는다.

```python
a = 10
print("before del operation:", a)
del a

# 아래 문장을 실행하면 오류가 발생한다.
# 변수 a의 객체와의 연결이 끊어졌기 때문이다.
print("after del operation:", a)
```

```powershell
before del operation: 10
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
<ipython-input-11-00251089c84a> in <module>()
      9 # 아래 문장을 실행하면 오류가 발생한다.
     10 # 변수 a의 객체와의 연결이 끊어졌기 때문이다.
---> 11 print("after del operation:", a)

NameError: name 'a' is not defined
```

```python
a = 10
b = a

# 아래에 의해서 변수 a는 객체 10과의 연결이 끊겼지만
del a

# 변수 b는 살아있다.
print(b)

# del 키워드를 이용해서 리스트 객체에도 동일하게 적용할 수 있다.

a = [5,2,1,4,3]
print(a)

# 아래는 변수 a의 객체와의 연결을 끊는다.
del a
print(a)
```

```powershell
10
[5, 2, 1, 4, 3]
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
<ipython-input-12-539960bae723> in <module>()
      6 # 아래는 변수 a의 객체와의 연결을 끊는다.
      7 del a
----> 8 print(a)

NameError: name 'a' is not defined
```

```python
a = [5,2,1,4,3]
print(a)

# 아래는 a[3]에 대한 연결을 끊는다.
# 즉, 인덱스 3인 항목값을 삭제한다.
del a[3]

print(a)
```

```powershell
[5, 2, 1, 4, 3]
[5, 2, 1, 3]
```

<br>

## 7. 슬라이싱(slicing)

대괄호[ ]를 이용해 특정 항목을 사용할 수 있는 것과 같이,  
리스트의 부분 리스트를 만드는 슬라이싱 연산은 대괄호[ ]를 이용해 특정 부분을 사용하는 기능이다.

[ ] 내부에 숫자를 콜론(:)으로 구분해서 영역을 표시한다.  
**[시작(이상):끝(미만):증감]**

```python
# list[start: end+1]: start부터 end까지 1만큼 증가
# list[start: end+1: step]: start부터 end까지 step 만큼 증가. step을 생략하면 default로 1이다

a = [0, 1, 2, 3, 4, 5]
print(a[2:4]) # 인덱스 2번째부터 4번째까지(4번째는 포함 안함. 즉 2번째~3번째까지)
print(a[0:5:2])

a = [0, 1, 2, 3, 4, 5]
print(a) # 방법1

print(a[0:6]) # 방법2

print(a[0:len(a)]) # 방법3: 굳이 이렇게 할 필요 없지만 필요한 경우에 사용

print(a[:]) # 방법 4: 모든 값을 비워두었으니, 처음부터 끝까지

a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(a[::-1])  # 리스트 값들을 역순으로 출력(증감값이 -이면 끝에서...를 의미)
print(a[::-2])  # 끝에서 부터 하나씩 인덱스를 건너뛰면서 출력
```

```powershell
[2, 3]
[0, 2, 4]
[0, 1, 2, 3, 4, 5]
[0, 1, 2, 3, 4, 5]
[0, 1, 2, 3, 4, 5]
[0, 1, 2, 3, 4, 5]
[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
[9, 7, 5, 3, 1]
```

<br>

## 8. 여러 함수들(method)

메쏘드(method)는 클래스(class)와 관련있다.  
클래스는 객체 지향 프로그래밍과 관련있다.  
객체(object)는 값(data)와 함수(function)을 합친 개념이다.  
파이썬에서 모든 데이터는 객체다.

간단히 말하면,  
**객체 이름 뒤에 .을 붙여서 객체에서 제공하는 여러 기능을 사용할 수 있다.**  
그 기능을 메쏘드(method)라 한다.

### 1) in 키워드

**리스트 안에 원하는 값이 존재하는지 검사**하는 키워드이다.  
in 키워드는 리스트에 **존재하면 True**를 반환한다.

```python
a = [1, 2, 2, 3, 4, 5, 5, 5]

print(3 in a)
print(10 in a)
```

```powershell
True
False
```

<br>

### 2) 리스트 검색

count( ), index( ) 함수는 리스트 안에 원하는 값이 존재하는지 검사한다.  
count( )는 리스트에 있는 파라미터 **값을 개수로** 반환하고,  
index( )는 리스트에 있는 파라미터 **값의 처음 1개만의 위치**를 반환한다.

```python
a = [1, 2, 2, 3, 4, 5, 5, 5]
print(a.count(5))
print(3 in a)
print(10 in a)
print(a.index(3))
```

```powershell
3
True
False
3
```

<br>

index( ) 함수 사용시 검색할 항목이 없으면 ValueError가 발생하기에,  
**검색하기 전에 인덱스를 체크**해야 한다.

```python
if 10 in a:
    print(a.index(10))
```

```powershell
---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
<ipython-input-2-fb6295851e2f> in <cell line: 5>()
      3 # print(a.index(10))
      4 # 따라서 검색하기 전에 인덱스를 체크해야함
----> 5 if 10 in a:
      6     print(a.index(10))

NameError: name 'a' is not defined
```

```python
a = [1, 2, 2, 3, 4, 5, 5, 5]
print(a)

# count() 함수는 파라미터의 중복된 갯수 반환
print(a.count(5))

# index() 함수는 파라미터의 위치(인덱스) 반환
print(a.index(2))
```

```powershell
[1, 2, 2, 3, 4, 5, 5, 5]
1
3
```

<br>

### 3) 리스트의 항목 추가

insert( ) : 원하는 인덱스에 **원하는 값을 삽입**한다.  
append( ) : 리스트의 **마지막에 값을 추가**한다.  
extend( ) : 리스트의 **끝에 다른 리스트를 덧붙인다.**

```python
a = [1, 2, 4, 5]
a.insert(3, 3)
a.append(6)
print(a)

a = [1, 2, 3, 4, 5, 6]
a.extend([7,8,9])
print(a)
```

```powershell
[1, 2, 4, 3, 5, 6]
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

### 4) 리스트의 항목 삭제

remove( )는 리스트의 항목을 삭제할 때 사용하는 함수다.  
삭제할 값이 없으면 ValueError가 발생하기에 **값이 존재하는지 먼저 체크**하는 것이 안전하다.

키워드 del을 이용해서 삭제할 수 있다.  
remove와의 차이점은 **del은 함수가 아닌 연산자 또는 키워드**다.

```python
a = [1, 2, 3, 4, 5, 5]

a.remove(4)
print(a)

# del을 이용한 삭제
print(a)

del a[2]

print(a)

# del로는 리스트 전체를 삭제할 수 없다.
del a
print(a)

```

```powershell
[1, 2, 3, 5, 5]
[1, 2, 3, 5, 5]
[1, 2, 5, 5]

---------------------------------------------------------------------------
NameError                                 Traceback (most recent call last)
<ipython-input-37-ee72d7a5cee8> in <module>()
      3
      4 # 따라서 아래의 문장을 실행하면 오류가 발생합니다.
----> 5 print(a)

NameError: name 'a' is not defined
```

<br>

### 5) 리스트 정렬

sort( )는 리스트 내 요소를 **오름차순**으로 정리하며,  
**내림차순**으로 정리하고 싶다면 **sort(reverse = True)를** 입력하면 된다.

sorted( )는 정렬된 새로운 리스트를 리턴시켜준다.  
반면, sort는 아무것도 리턴시켜주지 않는다.(None을 리턴시켜준다)

```python
a = [5,2,1,4,3]
a.sort()
print(a)

a = [5,2,1,4,3]
a.sort(reverse=True)
print(a)

b = [5, 7, 2, 3, 1]

print(sorted(b))
print(b.sort())

b = [5, 7, 2, 3, 1]

sorted(b)
print(sorted(b))
print(b)

b = [5, 7, 2, 3, 1]

b.sort()
print(b)
```

```powershell
[1, 2, 3, 4, 5]
[5, 4, 3, 2, 1]
[1, 2, 3, 5, 7]
None
[1, 2, 3, 5, 7]
[5, 7, 2, 3, 1]
[1, 2, 3, 5, 7]
```

```toc

```
