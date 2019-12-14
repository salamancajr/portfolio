import React from 'react'
import { expect } from 'chai'
import { shallow, configure } from 'enzyme'
import Navbar from './navbar'
import NavItem from './NavItem'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<Navbar />', () => {
  it('renders three <NavItem /> components', () => {
    const wrapper = shallow(<Navbar />)
    expect(wrapper.find(NavItem)).to.have.lengthOf(6)
  })
})
