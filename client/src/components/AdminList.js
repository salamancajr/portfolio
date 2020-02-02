import React, { useState, useEffect } from 'react'
import { ReactSortable } from 'react-sortablejs'
import _ from 'lodash'

const AdminList = ({ deleteListItem, updateListOrder, list, selectListItem }) => {
  const [state, setState] = useState(list)

  useEffect(() => {
    setState(list)
  }, [list])

  const callToDelete = (e) => deleteListItem(e.target.id)
  const handleDrag = (e) => {
    const order = []
    const array = e.target.parentElement.childNodes
    for (let i = 0; i < array.length; i++) {
      order.push({ orderNum: i, id: array[i].id })
    }

    updateListOrder(order)
  }

  const renderList = () => {
    return _.map(state, listItem => {
      return (
        <tr
          id={listItem._id}
          key={listItem._id}
          draggable="true"
          onDragEndCapture={handleDrag}
        >
          <th>{listItem.title}</th>
          <th>
            <label htmlFor="blogListCheck">
              <i
                name={listItem.title}
                id={listItem.title}
                onClick={() => selectListItem(listItem._id)}
                className="fas fa-edit pointer"
                data-target="#editProject"
                data-toggle="modal"
              >
              </i>
            </label>

          </th>
          <th>
            <i
              id={listItem._id}
              onClick={e => {
                callToDelete(e)
                // document.getElementById(`warning${listItem._id}`).style.display = 'block'
              }}
              className="fas fa-trash pointer">
            </i>
          </th>
        </tr>
      )
    })
  }

  return (
    <ReactSortable list={state} setList={setState} tag="tbody" className="projects-table__body">
      {renderList()}
    </ReactSortable>
  )
}

export default AdminList
