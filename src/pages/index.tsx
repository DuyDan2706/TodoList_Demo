import { useState } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { z } from 'zod'
import { makeStyles } from '@mui/styles'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'
/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles({
  tabsContainer: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  tab: {
    marginLeft: '10px', // Adjust the value as needed
  },
})
const Index = () => {
  const classes = useStyles()
  const TabName = z.enum(['all', 'pending', 'completed'])
  type TabName = z.infer<typeof TabName>

  const tabIndexes: { [key in TabName]: number } = {
    all: 0,
    pending: 1,
    completed: 2,
  }

  const [activeTab, setActiveTab] = useState<number>(tabIndexes.all)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }
  return (
    <main className="mx-auto  w-[480px]    pt-12">
      <div className="rounded-12  bg-white  p-8 shadow-sm ">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <div className=" pt-10">
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{ style: { display: 'none' } }}
            className={classes.tabsContainer}
          >
            <Tab
              label="All"
              className={`${classes.tab} ${
                activeTab === tabIndexes.all
                  ? 'bg-gray-700 text-white '
                  : 'text-gray-700'
              } darkGreen:bg-gray-700 darkGreen:text-white`}
              style={{
                borderRadius: '9999px',
                border: '1px solid var(--gray-700, #E2E8F0)',
                color:
                  activeTab === tabIndexes.all ? 'white' : 'var(--darkGreen)',
              }}
            />
            <Tab
              label="Pending"
              className={`${classes.tab} ${
                activeTab === tabIndexes.pending
                  ? 'bg-gray-700 text-white '
                  : 'text-gray-700'
              } darkGreen:bg-gray-700 darkGreen:text-white`}
              style={{
                borderRadius: '9999px',
                border: '1px solid var(--gray-700, #E2E8F0)',
                color:
                  activeTab === tabIndexes.pending
                    ? 'white'
                    : 'var(--darkGreen)',
              }}
            />
            <Tab
              label="Completed"
              className={`${classes.tab} ${
                activeTab === tabIndexes.completed
                  ? 'bg-gray-700 text-white '
                  : 'text-gray-700'
              } darkGreen:bg-gray-700 darkGreen:text-white`}
              style={{
                borderRadius: '9999px',
                border: '1px solid var(--gray-700, #E2E8F0)',
                color:
                  activeTab === tabIndexes.completed
                    ? 'white'
                    : 'var(--darkGreen)',
              }}
            />
          </Tabs>
        </div>

        <div className="pt-10">
          <TodoList status={Object.keys(tabIndexes)[activeTab] as TabName} />
        </div>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}
interface CustomTabPanelProps<T extends string> {
  children: React.ReactNode
  value: T
  index: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomTabPanel = <T extends string>({
  children,
  value,
  index,
}: CustomTabPanelProps<T>) => (
  <div
    role="tabpanel"
    hidden={value !== index.toString()}
    id={`basic-tabpanel-${index}`}
    aria-labelledby={`basic-tab-${index}`}
  >
    {value === index.toString() && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
)
export default Index
