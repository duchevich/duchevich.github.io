
# НЕЙМИНГ
===============================================================================

## Пространства имен

### В классах
* .s-{name} (section) - для секций
* .m-{name} (modal) - для модальных окон




# SMACSS: О порядке в написания css свойств
===============================================================================

I organize in the following order:

1. Box
2. Border
3. Background
4. Text
5. Other

Box includes any property that affects the display and position of the box such as display, float, position, left, top, height, width and so on. These are most important to me because they affect the flow of the rest of the document.

Border includes border, the oft-unused border-image, and border-radius.

Background comes next. With the advent of CSS3 gradients, background declarations can actually become quite verbose. Once again, vendor prefixes just compound the issue.

Complex patterns are possible with CSS3 gradients but create for lengthy background declarations, and the example doesn't even include CSS3 prefixes. Just imagine how long this declaration would be if it did!

Text declarations include font-family, font-size, text-transform, letter-spacing and any other CSS properties that affect the display of the type.

Anything that doesn’t fall into any of the above categories gets added to the end.
