import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('title and author are rendered but not url', () => {


  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler}/>
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'testerboy' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'localhost' }
  })


  fireEvent.submit(form)


  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('testing of forms could be easier' )
  expect(mockHandler.mock.calls[0][0].author).toBe('testerboy' )
  expect(mockHandler.mock.calls[0][0].url).toBe('localhost' )









})