---
title: "Python | 16. 함수의 이해"
description: "함수란 우리가 알고있는 개념처럼 주어진 입력(input)에 대해서 의도된 출력(output)를 전달하는 역할을 한다."
pubDate: 2024-02-29
updatedDate: 2024-11-27
tags: ["Python"]
category: "✏️ Study"
---
함수란 우리가 알고있는 개념처럼 주어진 입력(input)에 대해서 의도된 출력(output)를 전달하는 역할을 한다.

## **1. 함수**

**range 함수**는 정수를 입력으로 전달하면 **[0, 정수)** 로 이루어진 리스트를 생성하는 역할을 한다.

**sum 함수**는 리스트, 튜플 등을 입력으로 전달하면 전체 아이템의 **합**을 출력으로 전달하는 역할을 한다.

**len 함수**는 리스트, 튜플 등을 입력으로 전달하면 아이템의 **개수**를 출력으로 전달하는 역할을 한다.

이 함수들은 모두 python 내부에 이미 정의(구현) 되어 있다.

이 같은 함수를 **내장함수**(built-in-function)이라고 한다.

```python
a = [1, 2, 3, 4]
length = len(a)
print(length)

summation = sum(a)
print(summation)
```

```powershell
4
10
```

## **2. 함수의 정의**

정의 시 최초에 **def** 키워드를 사용한다.

argument 정의(함수에 입력으로 전달하는 값을 의미, argument 또는 parameter라고 함)

함수 역시 코드 블록이기 때문에 **콜론(:)**이 필요하다.

body(함수의 구현 부분, 함수 역시 코드 블록이기에 들여쓰기 된 부분까지 함수의 코드 블록으로 인지한다)

함수를 호출한 코드(caller)로 함수가 해당 기능을 수행하고

완료된 값(output)을 전달하기 위해 return 키워드를 사용한다.

즉, **return 이후에 오는 값을 caller로 전달**한다.

함수의 네이밍도 역시 중요하다.

즉, **어떤 기능을 하는 함수인지 이름으로 최대한 나타날 수 있게 해야한다.**

### **1) 함수의 사용(호출)**

함수명(파라미터1, 파라미터2, …, 파라미터n)

이와 같이 정의된 함수의 이름과 전달되는 parameter(인자)를 **괄호안에 전달**해 함수를 호출한다.

함수가 호출되면 실행의 흐름이 호출자(caller)에서 함수(callee)로 변경된다.

함수의 입력(input) 파라미터, argument라고도 한다.

### **2) 함수 네이밍(naming)**

함수 이름으로부터 기능이 명시된다.

의미와 반대되거나 맞지 않는 이름은 사용 금지한다.

## **3. parameter(argument) (인자)**

**함수에 전달되는 입력(input)이다.**

입력이 필요하지 않을 수도, 1개의 입력만 있을 수도, 여러개의 입력이 존재할 수도 있다.

파라미터로 int, string, float, boolm, list, dict 등 어떤 파이썬 객체도 전달 가능하다.

심지어, **함수도 함수의 파라미터로 전달 가능**하다.

python의 경우, 타입 명시가 없기에, 함수 생성 시, 의도된 파라미터의 타입에 맞게 입력을 전달하는 것이 중요하다.

또한 파라미터를 전달할 때, **정의된 순서에 따라 값을 전달**하는 것이 중요하다.

```python
def substract(x, y):
    sub = x - y
    return sub

a = substract(100, 70)
print(a)
```

```powershell
30
```

### **1) Default parameter(기본 인자)**

함수의 파라미터에 **기본값을 지정**할 수 있다.

파라미터를 명시하지 않을 경우, 지정된 기본값으로 대체한다.

```python
def add(x, y=10, z=5):
    a = x + y + z
    return a
add(10)
add(10, 1, 2)
```

```powershell
25
13
```

**print 함수는 sep, end, file 등 여러 기본 파라미터를 가진다.**

```python
print(1, 2, 3, sep='!', end='%%%')
print(2, 3, 4, sep='p')
```

```powershell
1!2!3%%%2p3p4
```

### **2) Default parameter 사용 시 주의점**

**기본 인자 뒤에 일반 파라미터가 위치할 수 없다.**

```python
def test(a, b=3, c):
    print(a, b, c)

test(10, 20, 1)
```

```powershell
  File "<ipython-input-11-a26a25714758>", line 1
    def test(a, b=3, c):
            ^
SyntaxError: non-default argument follows default argument
```

### **3) keyword parameter(키워드 파라미터)**

파이썬의 경우, 파라미터에 값을 전달할 때, 파라미터의 이름을 명시해 전달 가능하다.

파라미터의 이름을 사용하지 않을 경우, **기본적으로 순서에 맞게 전달**한다.

```python
def test(x, y, z):
    a = x + y + z
    return a

test(x=10, z=3, y=50)
```

```powershell
63
```

## **4. return(리턴)**

기본적으로 **함수의 종료**를 명시한다.

return 옆에 값이나 수식이 있다면 해당 값을 호출자(caller)에게 반환(전달)한다.

**return만 존재하면 None을 반환**한다.

return이 없는 경우, 기본적으로 함수 코드 블록이 종료되면 종료로 간주한다.

이때도 None을 반환한다.

```python
def weird_multiply(x, y):
    if x > 10:
        return x * y

    print(x + y)
    return (x + 2) * y

weird_multiply(12, 5)

def weird_multiply(x, y):
    if x > 10:
        return x * y
    # return이 생략된 것과 마찬가지
c = weird_multiply(2, 5)
print(c)
```

```powershell
60
None
```

### **1) multiple return(복수 값 반환)**

tuple반환을 해 **복수개의 값을 리턴**할 수 있다.

```python
def add_mul(x, y):
    s = x + y
    m = x * y

    return s, m

a, b = add_mul(20, 3)
print(a, b)
```

```powershell
23 60
```

## **5. variable scope(변수의 범위)**

변수가 참조 가능한 코드상의 범위를 명시한다.

함수내의 변수는 자신이 속한 코드 블록이 종료되면 소멸된다.

이렇게 특정 코드 블록에서 선언된 변수를 **지역변수**(local variable)이라고 한다.

반대로 가장 상단에서 정의되어 프로그램 종료 전까지 유지되는 변수를 **전역변수**(global variable)이라고 한다.

같은 이름의 지역변수와 전역변수가 존재할 경우, 지역 변수의 우선순위가 더 높다.

## **6. variable length argument(가변길이 인자)**

전달되는 파라미터의 **개수가 고정적이지 않은 경우**에 사용한다.

*args : 파라미터를 튜플의 형태로 전달

**kwargs : 파라미터를 딕셔너리 형태로 전달(네임드 파라미터)

```python
def test(*args): # arguments
    for item in args:
        print(item)

test(10, 30, 40, 50, 60, 70)
```

```powershell
10
30
40
50
60
70
```

## **7. keyword parameter(키워드 파라미터)**

****가 붙은 경우에는 키워드 파라미터로 인식한다.**

즉, **함수 호출 시**, 파라미터의 이름과 값을 함께 전달할 수 있다.

가변길이 함수의 대표적인 예로 문자열 포맷 함수가 있다.

여러가지 값과 포맷을 이용해 문자열을 정의할 수 있는 함수다.

{ } placeholder를 문자열 내에 위치시킨 후, 해당 위치에 format함수로 전달된 값으로 대체해 문자열을 생성한다.

참조 : [포맷 구성 링크](https://pyformat.info/)

```python
a = '오늘 온도: {today_temp}도, 강수확률은: {today_prob}% 내일온도: {tomorrow_temp}도'.format(tomorrow_temp=23, today_prob=40, today_temp=40)
print(a)
```

```powershell
오늘 온도: 40도, 강수확률은: 40% 내일온도: 23도
```
