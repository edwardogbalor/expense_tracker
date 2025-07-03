import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    PlusCircleIcon,
  ClipboardDocumentListIcon,
  } from "@heroicons/react/24/solid";
   
  export function DefaultSidebar() {
    return (
      <Card
        className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl bg-white rounded-2xl"
        placeholder=""
        onResize={() => {}}
        onResizeCapture={() => {}}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <div className="mb-2 p-4">
          <Typography
            variant="h5"
            className="text-blue-gray-700"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Expense Tracker 
          </Typography>
        </div>
        <List
          className="text-blue-gray-700"
          placeholder=""
          onResize={() => {}}
          onResizeCapture={() => {}}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <ListItem
            className="hover:bg-blue-gray-50"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <ListItemPrefix
              placeholder=""
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <PresentationChartBarIcon className="h-5 w-5 text-blue-gray-700" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem
            className="hover:bg-blue-gray-50"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <ListItemPrefix
              placeholder=""
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <PlusCircleIcon className="h-5 w-5 text-blue-gray-700" />
            </ListItemPrefix>
            Add Transaction
          </ListItem>
          <ListItem
            className="hover:bg-blue-gray-50"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <ListItemPrefix
              placeholder=""
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <ClipboardDocumentListIcon className="h-5 w-5 text-blue-gray-700" />
            </ListItemPrefix>
            All transactions
            <ListItemSuffix
              placeholder=""
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                className="rounded-full bg-blue-gray-100 text-blue-gray-700"
              />
            </ListItemSuffix>
          </ListItem>
          
          <ListItem
            className="hover:bg-blue-gray-50"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <ListItemPrefix
              placeholder=""
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <Cog6ToothIcon className="h-5 w-5 text-blue-gray-700" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem
            className="hover:bg-blue-gray-50"
            placeholder=""
            onResize={() => {}}
            onResizeCapture={() => {}}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <ListItemPrefix
              placeholder=""
              onResize={() => {}}
              onResizeCapture={() => {}}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              <PowerIcon className="h-5 w-5 text-blue-gray-700" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }