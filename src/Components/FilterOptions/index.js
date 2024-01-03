import {Component} from 'react'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterOptions extends Component {
  state = {activeSalary: '', EmployList: []}

  handleRadio = event => {
    const {handleRadioChange} = this.props
    console.log(`${event.target.id} hurray 2..................`)
    handleRadioChange(event.target.id)

    this.setState({activeSalary: event.target.id})
  }

  handleCheckBox = event => {
    const {EmployList} = this.state
    const {handleEmployement} = this.props
    const CheckboxNotInLists = EmployList.filter(
      each => each === event.target.id,
    )
    if (CheckboxNotInLists.length === 0) {
      this.setState(
        prevState => ({
          EmployList: [...prevState.EmployList, event.target.id],
        }),
        () => {
          handleEmployement(EmployList)
        },
      )
    } else {
      const filterData = EmployList.filter(each => each !== event.target.id)
      this.setState(
        {
          EmployList: filterData,
        },
        () => {
          handleEmployement(EmployList)
        },
      )
    }
  }

  render() {
    const {EmployList, activeSalary} = this.state
    console.log(
      `${EmployList} ..............................................................................................`,
    )
    console.log(activeSalary)

    return (
      <div>
        <hr />
        <h1 className="header-check">Type of Employment</h1>
        {employmentTypesList.map(each => (
          <div className="">
            <input
              type="checkbox"
              id={each.employmentTypeId}
              className=""
              onChange={this.handleCheckBox}
              value=""
            />
            <label htmlFor="" className="check">
              {each.label}
            </label>
          </div>
        ))}

        <hr />
        <h1 className="header-radio">Salary Range</h1>
        <fieldset className="order-radio">
          {salaryRangesList.map(each => (
            <label htmlFor="10" className="radio">
              <input
                type="radio"
                id={each.salaryRangeId}
                className=""
                onChange={this.handleRadio}
                value={each.label}
              />{' '}
              {each.label}
            </label>
          ))}
        </fieldset>
      </div>
    )
  }
}
export default FilterOptions
