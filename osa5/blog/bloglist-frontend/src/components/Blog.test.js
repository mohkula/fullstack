import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('url and likes are also rendered when clicking the view-button', () => {
  const blog = {
    title: 'test',
    author: 'tester',
    url: 'testurl',
    likes: 4,
    user: { username:'user' }
  }



  const component = render(
    <Blog blog={blog} loggedUsername={'uuseri'}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('testurl')
  expect(component.container).toHaveTextContent(4)



})


test('liking calls the like-function correctly', () => {
  const blog = {
    title: 'test',
    author: 'tester',
    url: 'testurl',
    likes: 4,
    user: { username:'user' }
  }

  const mockHandler = jest.fn()


  const component = render(
    <Blog blog={blog} like={mockHandler}/>
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')


  expect(component.container).toHaveTextContent('testurl')
  expect(component.container).toHaveTextContent(4)



})