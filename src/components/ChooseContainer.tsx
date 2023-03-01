import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { Checkbox, Button } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useState } from 'react';
import { ChooseItem } from '../App';
import '../App.css'

type Props = {
  title: string
  checkedAll: boolean,
  setCheckedAll: (value: boolean) => void
  chooseList:  ChooseItem[],
  setChooseList: (value: ChooseItem[]) => void,
  checkedList: ChooseItem[],
}
const ChooseContainer: React.FC<Props> = ({title, chooseList, setChooseList, checkedList, checkedAll, setCheckedAll}) => {
const [showCollapse, setShowCollapse] = useState(true)
    const onChangeCheckedAll = (e: CheckboxChangeEvent) => {
        setCheckedAll(e.target.checked)
        const newChooseList = chooseList.map(item => {
            return {...item, checked: e.target.checked}
        })
        setChooseList(newChooseList)
      };
    const onChangeCheckedItem = (item: ChooseItem, value:CheckboxChangeEvent) => {
        const indexOfItem = chooseList.indexOf(item)
        const newChooseList = [
            ...chooseList.slice(0, indexOfItem),
            { ...item, checked: value.target.checked },
            ...chooseList.slice(indexOfItem + 1),
          ]
          setChooseList(newChooseList)
      };
    const onClickCollapse = () => {
        console.log(showCollapse);
        setShowCollapse(pre => !pre)
      };

  return (
    <div className="container">
      <div className="header">
        <div style={{display: 'flex', alignItems: 'center'}}>
        <Checkbox checked={checkedAll} onChange={onChangeCheckedAll} >
        </Checkbox>
        <div style={{marginLeft: 12}}>
            <p style={{fontSize: 16}}>{title}</p>
            <p style={{fontSize: 12, marginTop: 4}}>{checkedList.length}/{chooseList.length} selected</p>
        </div>
        </div>
        <div onClick={onClickCollapse}>
        { showCollapse ? <UpOutlined /> : <DownOutlined /> }
        </div>
      </div>
      <div className='list-container' >
        {
            showCollapse && <div className='list-item'>
            {
                chooseList.map((item, index) => {
                    return <div key={index} className='item-container'>
                        <Checkbox checked={item.checked} onChange={(value) => onChangeCheckedItem(item, value)} />
                        <p style={{marginLeft: 12}}>{item.title}</p>
                    </div>
                })
            }
            </div>
        }
        <div className='footer-list'>
        <Button>Sort</Button>
        </div>
      </div>
    </div>
  )
}

export default ChooseContainer
