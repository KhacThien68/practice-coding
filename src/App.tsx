
import { LeftOutlined, RightOutlined, SwapOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';

import ChooseContainer from './components/ChooseContainer';
import { CHOICES_LIST, CHOSEN_LIST } from './components/constants';

export type ChooseItem = {
  title: string,
  value: number,
  checked: boolean,
}

function App() {
const [checkedAllChoices, setCheckedAllChoices] = useState(false)
const [choicesList, setChoicesList] = useState(CHOICES_LIST)
const [checkedChoiceList, setCheckedChoiceList] = useState<ChooseItem[]>([])

const [checkedAllChosen, setCheckedAllChosen] = useState(false)
const [chosenList, setChosenList] = useState(CHOSEN_LIST)
const [checkedChosenList, setCheckedChosenList] = useState<ChooseItem[]>([])

useEffect( () => {
  if (choicesList.every(item  => item.checked === true) ){
      setCheckedAllChoices(true)
  } else {
      setCheckedAllChoices(false)
  }
  const newCheckedList = choicesList.filter(item => item.checked === true)
  setCheckedChoiceList(newCheckedList)
}, [choicesList])

useEffect( () => {
  if (chosenList.every(item  => item.checked === true) ){
      setCheckedAllChosen(true)
  } else {
      setCheckedAllChosen(false)
  }
  const newCheckedList = chosenList.filter(item => item.checked === true)
  setCheckedChosenList(newCheckedList)
}, [chosenList])

const handleAddChosen = () => {
  const newChoicesList = choicesList.filter(item => !checkedChoiceList.includes(item))
  setChosenList([...chosenList, ...checkedChoiceList])
  setChoicesList(newChoicesList)
}

const handleAddChoices = () => {  
  const newChosenList = chosenList.filter(item => !checkedChosenList.includes(item))
  setChoicesList([...choicesList, ...checkedChosenList])
  setChosenList(newChosenList)
}
const handleSwap = () => {
  const newChoicesList = choicesList.filter(item => !checkedChoiceList.includes(item))
  const newChosenList = chosenList.filter(item => !checkedChosenList.includes(item))
  setChosenList([...newChosenList, ...checkedChoiceList])
  setChoicesList([...newChoicesList, ...checkedChosenList])
}

  return (
    <div className="App">
      <ChooseContainer 
      title={'Choices'}
      checkedAll={checkedAllChoices}
      setCheckedAll={setCheckedAllChoices}
      chooseList={choicesList} 
      setChooseList={setChoicesList} 
      checkedList={checkedChoiceList}
      />
      <div className="button-container">
        <Button onClick={handleAddChosen} disabled={!checkedChoiceList.length} >
        <RightOutlined />
        </Button>
        <Button onClick={handleAddChoices} disabled={!checkedChosenList.length} style={{margin: '20px 0'}}>
        <LeftOutlined />
        </Button>
        <Button onClick={handleSwap}>
        <SwapOutlined />
        </Button>
      </div>
      <ChooseContainer 
      title={'Chosen'}
      checkedAll={checkedAllChosen}
      setCheckedAll={setCheckedAllChosen}
      chooseList={chosenList} 
      setChooseList={setChosenList} 
      checkedList={checkedChosenList}
      />
    </div>
  );
}

export default App;
