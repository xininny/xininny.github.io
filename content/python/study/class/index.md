---
emoji: 𝐏
title: Python | 17. Class
date: '2024-03-01 00:00:00'
author: xininny
tags: Python Class 클래스
categories: Python
---

파이썬의 모든 것은 객체(object)로 관리된다.@

<br>

## 1. 용어 정리

### 1) class란

클래스(class)란 실세계의 것을 모델링해 **속성**(attribute)와 **동작**(method)를 갖는 **데이터 타입**이다.  
파이썬에서 string, int, list, dict.. 모두가 다 클래스로 존재한다.

따라서, **다루고자 하는 데이터(변수)와 데이터를 다루는 연산(함수)를 하나로 캡슐화해 클래스로 표현**한다.  
모델링에서 중요시하는 속성에 따라 클래스의 속성과 행동이 각각 달라진다.  
객체를 생성하기 위해 객체의 **모체가 되는 class를 미리 선언**해야 한다.

<br>

### 2) object란

클래스로 생성되어 구체화된 **객체**(instance)이다.  
파이썬의 모든 것(int, str, list ...)은 객체(instance)이다.  
실제로 **class가 인스턴스화되어 메모리에 상주하는 상태**를 의미한다.

<br>

### 3) self

파이썬의 method는 항상 첫번째 인자로 self를 전달한다.  
self는 **현재 해당 메쏘드가 호출되는 객체 자신을 가리킨다.**  
C++/C#, Java의 this에 해당한다.  
역시, 이름이 self일 필요는 없지만, 위치는 항상 맨 처음의 파라미터이며 관례적으로 self로 사용한다.

<br>

### 4) init(self)

생성자, 클래스 인스턴스가 **생성**될 때 호출된다.  
self인자는 항상 첫번째에 오며 자기 자신을 가리킨다.  
이름이 꼭 self일 필요는 없지만, 관례적으로 self로 사용한다.  
생성자에서는 해당 클래스가 다루는 데이터를 정의한다.  
이 데이터를 멤버 변수 또는 속성이라고 한다.

<br>

### 5) method 정의

멤버함수라고도 하며, 해당 클래스의 object에서만 호출할 수 있다.  
메쏘드는 객체 레벨에서 호출되며, 해당 객체의 속성에 대한 연산을 행한다.  
**{obj}.{method}( )** 형태로 호출된다.

<br>

### 6) Class Inheritance(상속)

기존에 정의해둔 클래스의 기능을 그대로 물려받을 수 있다.  
기존 클래스에 기능 일부를 추가하거나, 변경해 새로운 클래스를 정의한다.  
코드를 재사용할 수 있게 된다.

상속 받고자 하는 대상인 **기존 클래스**는 Parent, Super, Base class라고 부른다.  
상속 받는 **새로운 클래스**는 Child, Sub, Derived class라고 부른다.  
의미적으로 is-a관계를 갖는다.

<br>

### 7) method override

부모 클래스의 method를 **재정의**(override)한다.  
하위 클래스(자식 클래스)의 인스턴스로 호출시, 재정의된 메소드가 호출된다.

**super** : 하위 클래스(자식 클래스)에서 부모 클래스의 method를 호출할 때 사용한다.

<br>

### 8) method type

**instance** method : 메쏘드는 객체 레벨로 호출되기에 해당 메쏘드를 호출한 객체에만 영향을 미친다.

**class** method : 클래스 레벨로 호출되기에 클래스 멤버 변수만 변경할 수 있다.

<br>

### 9) special method, magic method

**로 시작 **로 끝나는 특수 함수다.  
해당 메쏘드를 구현하면, **커스텀 객체에 여러가지 파이썬 내장 함수나 연산자를 적용할 수 있다.**

오버라이딩 가능한 함수 목록 : <a href="https://docs.python.org/3/reference/datamodel.html" target="_blank"> Data model</a>, <a href="https://zzsza.github.io/development/2020/07/05/python-magic-method/" target="_blank"> Python Magic Method 사용법</a>

클래스라는 것은 데이터와 이 데이터를 조작할 수 있는 함수(멤버 함수, method)를 통합한 개념이다.

<br>

## 2. 파이썬에서는 클래스도 객체다

```python
def test_function():
    return 'test_function worked !!'

print(type(test_function))
```

```powershell
<class 'function'>
```

<br>

컴퓨터 프로그램에서 사용하는 데이터는 **객체**(object)라는 단위로 저장되고 관리된다.  
객체는 값(value), 자료형(data type), 객체 id를 가진다.

```python
# 변수(variables)와
a = 0
print(a) # 객체의 값
print(type(a)) # 객체의 자료형
print(id(a)) # 객체의 id

b = 0
print(b) # 객체의 값
print(type(b)) # 객체의 자료형
print(id(b)) # 객체의 id
```

```powershell
0
<class 'int'>
94912135068128
0
<class 'int'>
94912135068128
```

<br>

파이썬에서 인스턴스를 만드는 방법은 3가지가 있다.

1. **리터럴**(literal): 0, 0.1, 'Python', ['math', 'history', 'biology'] 같이 표현된 그 자체로써 객체이다.

2. **식의 평가 결과**: 0+1, 'Welcome'+'Python'과 같이 식을 평가한 결과로써 객체이다.

3. **instantiation**: a = int()

int( )를 엄밀히 말하면 instantiation이다.

<br>

### 1) 변수

- \_\_doc\_\_는 자동으로 생성되는 **멤버 변수**다. docstring이라고 한다.

- **help( )** 함수를 통해서 모르는 것을 찾아볼 수 있다.

- **self**는 자신을 호출한 인스턴스를 가리키는 변수라고 생각하면 된다.

  - 3가지 메쏘드(인스턴스 메쏘드, 클래스 메쏘드, 정적 메쏘드) 중에서 인스턴스 메쏘드는 모두 self라는 파라미터를 적어줘야 한다.

<br>

### 2) method 내부에서 다른 메쏘드 호출하기

다른 메쏘드를 호출하려면 **self.** 을 사용해야 한다.

```python
def say():
    return "I am external other function."


class FishShapedBun:
    def say(self):
        return "Delicious~"

    def how_much(self):
        return 1000

    def greeting(self):
        print(self.say())
        print(say())
        return 'Hi~~~ '
a = FishShapedBun()
a.greeting()
```

```powershell
Delicious~
I am external other function.
'Hi~~~ '
```

<br>

### 3) 클래스 변수, 초기자, 소멸자

- **클래스 변수** : 멤버 함수에 소속되지 않는다.

- **초기자(생성자, \_\_init\_\_)** : 생성된 인스턴스의 개수를 카운팅한다.

- **소멸자(\_\_del\_\_)** : 인스턴스를 삭제한다.

```toc

```
