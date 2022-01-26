import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('title and author are rendered but not url', () => {
  const blog = {
    title: 'test',
    author: 'tester',
    url: 'testurl',
    likes: 4
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('test')

  expect(component.container).toHaveTextContent('tester')
  expect(component.container).not.toHaveTextContent('testurl')
  expect(component.container).not.toHaveTextContent(4)



})