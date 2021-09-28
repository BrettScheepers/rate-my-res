// Icons
import WcIcon from '@mui/icons-material/Wc'; //Private Bathroom
import FastfoodIcon from '@mui/icons-material/Fastfood'; //Dining Hall
import WifiIcon from '@mui/icons-material/Wifi'; //Wifi
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService'; //Laundry
import AcUnitIcon from '@mui/icons-material/AcUnit'; //Air Cond
import KitchenIcon from '@mui/icons-material/Kitchen'; //Kitchen
import WeekendIcon from '@mui/icons-material/Weekend'; //Student Area
import ElevatorIcon from '@mui/icons-material/Elevator'; //Elevator
import RunCircleIcon from '@mui/icons-material/RunCircle'; //Gym
import EmailIcon from '@mui/icons-material/Email'; //Mailroom

export const amenitiesDefaultArr = [
    {
        data: "bathroom",
        text: "Private Bathroom",
        icon: <WcIcon fontSize="large" />,
        active: false,
    },
    {
        data: "dining",
        text: "Dining Hall",
        icon: <FastfoodIcon fontSize="large" />,
        active: false,
    },
    {
        data: "wifi",
        text: "Wifi",
        icon: <WifiIcon fontSize="large" />,
        active: false,
    },
    {
        data: "laundry",
        text: "Laundry",
        icon: <LocalLaundryServiceIcon fontSize="large" />,
        active: false,
    },
    {
        data: "airconditioning",
        text: "Air Conditioning",
        icon: <AcUnitIcon fontSize="large" />,
        active: false,
    },
    {
        data: "kitchen",
        text: "Kitchen",
        icon: <KitchenIcon fontSize="large" />,
        active: false,
    },
    {
        data: "studentarea",
        text: "Student Area",
        icon: <WeekendIcon fontSize="large" />,
        active: false,
    },
    {
        data: "elevator",
        text: "Elevator",
        icon: <ElevatorIcon fontSize="large" />,
        active: false,
    },
    {
        data: "gym",
        text: "Gym",
        icon: <RunCircleIcon fontSize="large" />,
        active: false,
    },
    {
        data: "mail",
        text: "Mailing Facilities",
        icon: <EmailIcon fontSize="large" />,
        active: false,
    }
]

// export { amenitiesDefaultArr }