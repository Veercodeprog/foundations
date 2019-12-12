import React from 'react'
import { shallow } from 'enzyme'
import { Profile, renderForm, filterCommunication, mapStateToProps, mapDispatchToProps, validate } from '../profile'
import { contact } from '@/sagas/__stubs__/contact'
import { ReduxState } from '@/types/core'

describe('profile', () => {
  describe('renderForm', () => {
    it('should match snapshot', () => {
      const mockOnNextHandler = jest.fn()
      const mockIsSubmitting = false
      const component = renderForm({ contact, onNextHandler: mockOnNextHandler, isSubmitting: mockIsSubmitting })({
        values: {}
      })
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderForm', () => {
    it('should match snapshot', () => {
      const mockOnNextHandler = jest.fn()
      const mockIsSubmitting = false
      const component = renderForm({ contact, onNextHandler: mockOnNextHandler, isSubmitting: mockIsSubmitting })({
        values: {}
      })
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('filterCommunication', () => {
    it('should run correctly', () => {
      const expected = '01632 961556'
      const result = filterCommunication(contact.communications, 'Home')
      expect(result).toEqual(expected)
    })
    it('should return null', () => {
      const expected = null
      const result = filterCommunication(undefined, 'Home')
      expect(result).toEqual(expected)
    })
    it('should return null', () => {
      const expected = null
      const result = filterCommunication(undefined, 'test' as any)
      expect(result).toEqual(expected)
    })
  })
  describe('Profile', () => {
    const mockProps = {
      contact: contact,
      onNextHandler: jest.fn(),
      onSubmitHandler: jest.fn(),
      isSubmitting: false
    }
    const wrapper = shallow(<Profile {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          checklistDetailData: {
            contact
          }
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact,
        isSubmitting: false
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact: {},
        isSubmitting: false
      })
    })
  })
  describe('mapDispatchToProps', () => {
    it('should run correctly onNextHandler', () => {
      const mockDispatch = jest.fn()
      const { onNextHandler } = mapDispatchToProps(mockDispatch)
      onNextHandler({})()
      expect(mockDispatch).toBeCalled()
    })
    it('should run correctly onSubmitHandler', () => {
      const mockDispatch = jest.fn()
      const { onSubmitHandler } = mapDispatchToProps(mockDispatch)
      onSubmitHandler({})
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('validate', () => {
    it('should return correct error message for phone number', () => {
      const input = {
        home: '',
        mobile: '',
        work: '',
        email: 'client@gmail.com'
      }
      const output = {
        home: 'At least one telephone number is required',
      }
      expect(validate(input)).toEqual(output)
    })

    it('should return correct error message for email', () => {
      const input = {
        home: '0987654321',
        mobile: '',
        work: '',
        email: 'client@'
      }
      const output = {
        email: 'Invalid email format'
      }
      expect(validate(input)).toEqual(output)
    })
  })
})
