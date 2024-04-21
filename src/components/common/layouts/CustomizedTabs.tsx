import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ReactNode } from "react";

type CustomizedTabsProps = {
  titles: string[] | ReactNode[];
  panels: React.ReactNode[];
  tabIndex?: number;
  onSelect?: (newTabIndex: number) => void;
};

const CustomizedTabs: React.FC<CustomizedTabsProps> = ({
  titles,
  panels,
  tabIndex,
  onSelect,
}) => {
  return (
    <Tabs className="mt-4" selectedIndex={tabIndex} onSelect={onSelect}>
      <TabList className="border-b-2 mb-10 p-0">
        {titles.map((title, index) => (
          <Tab
            className="inline-block bottom-[-1px] relative list-none cursor-pointer px-4 py-3 body-16-semibold text-neutral-50 outline-none"
            selectedClassName="!text-neutral-200 border-b-4 border-turquoise-50"
            key={index}
          >
            {title}
          </Tab>
        ))}
      </TabList>
      <div>
        {panels.map((panel, index) => (
          <TabPanel key={index}>{panel}</TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default CustomizedTabs;
