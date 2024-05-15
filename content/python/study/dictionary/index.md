---
emoji: 𝐏
title: Python | 8. Dictionary 자료형
date: '2024-02-21 00:00:00'
author: xininny
tags: Python Dictionary 자료형
categories: Python
---

딕셔너리는 Key와 Value를 한 쌍으로 가지는 자료형이다.@

### Dictionary 자료형

```python
# 딕셔너리 객체 생성
game_keys = {'A': 'attack', 'M': 'move', 'P': 'patrol'}
print(game_keys)


# key 값으로 value 사용
print(game_keys['A'])
print(game_keys['M'])

universities = {
     "subjects":["math", "computer", "science", "history"],
     "languages":["Korean", "English", "Chinese", "Japanese"]
     }

print(universities)
print(universities["subjects"])
```

```powershell
{'A': 'attack', 'M': 'move', 'P': 'patrol'}
attack
move
{'subjects': ['math', 'computer', 'science', 'history'], 'languages': ['Korean', 'English', 'Chinese', 'Japanese']}
['math', 'computer', 'science', 'history']
```

```python
fruits = {'A': "Apple"}
fruits['B'] = 'Blueberry'
fruits['M'] = 'Melon'

print(fruits)
print(fruits['A'])

fruits = {'A': "Apple"}
fruits['B'] = 'Blueberry'
fruits['M'] = 'Melon'
print(fruits)

print(fruits.keys())
print(fruits.values())
print(fruits.items())

print(type(fruits.keys()))
print(type(fruits.values()))
print(type(fruits.items()))
```

```powershell
{'A': 'Apple', 'B': 'Blueberry', 'M': 'Melon'}
Apple
{'A': 'Apple', 'B': 'Blueberry', 'M': 'Melon'}
dict_keys(['A', 'B', 'M'])
dict_values(['Apple', 'Blueberry', 'Melon'])
dict_items([('A', 'Apple'), ('B', 'Blueberry'), ('M', 'Melon')])
<class 'dict_keys'>
<class 'dict_values'>
<class 'dict_items'>
```
