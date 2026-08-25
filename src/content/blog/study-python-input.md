---
title: "Python | 3. input 함수"
description: "print( ) 함수와 input( ) 함수를 연속해서 사용함으로써 입력값을 확인할 수 있다."
pubDate: 2024-02-16
updatedDate: 2024-11-27
tags: ["Python"]
category: "✏️ Study"
---
## **input 함수**

print( ) 함수와 input( ) 함수를 연속해서 사용함으로써 입력값을 확인할 수 있다.

입력값의 자료형을 알아볼 땐 **type( )**를 사용한다.

입력값은 무조건 문자열이고, 숫자를 입력하더라도 문자열로 입력된다.

즉, input 함수는 **문자열을 반환**한다.

```python
print('Please, input a number:')
a = input()
print('You entered:', a)
print(type(a))

# 또는 아래와 같이 input( ) 함수를 사용할 수도 있음
# input() 함수에 문자열을 파라미터로 사용하면 메세지 출력 후에 값을 입력받을 수 있음

b = input('Please, input a second number:')
print('You entered:', b)
```

```powershell
Please, input a number:
linux
You entered: linux
<class 'str'>
Please, input a second number:123
You entered: 123
```

input( ) 함수는 문자열을 반환한다.

따라서 정수를 입력받고 싶으면 int( ) 함수를 이용해서 문자열을 숫자로 변환할 수 있다.

즉, input( ) 함수는 문자열로 입력받기 때문에 **숫자를 입력받으려면 int( ) 함수로 변환해서 사용**한다.

```python
msg = input("Enter any number and l will add 10 to the number: ")
no = int(float(msg))

print("You entered", no)
print("I'll add", 10, "to it")
print("So, the result is...", no + 10)
```

```powershell
Enter any number and l will add 10 to the number: 123.1
You entered 123
I'll add 10 to it
So, the result is... 133
```

int( ) 함수를 통해서 파라미터를 int 자료형으로 변경할 수 있다고 했지만 아래 문장은 에러다.

“1”, “123” 처럼 **숫자로 된 문자열만 변경이 가능**하다.

```python
print(int("AA"))
```

```powershell
ValueError                                Traceback (most recent call last)
<ipython-input-11-3688a62e4fa1> in <module>()
      2 # 그렇지만 아래 문장은 에러다
      3 # "1", "123" 처럼 숫자로 된 문자열만 변경이 가능하다.
----> 4 print(int("AA"))

ValueError: invalid literal for int() with base 10: 'AA'
```
