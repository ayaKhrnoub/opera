import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./Root";
import Account from "./Containers/Account";
import PersistLogin from "./Components/PersistLogin";
import { lazy, Suspense } from "react";
import Loading from "./Pages/Loading";
import Edit from "./Pages/Edit";
import Verify from "./Pages/Verify";

const Home = lazy(() => import("./Pages/Home"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));
const News = lazy(() => import("./Pages/News"));
const EventDetail = lazy(() => import("./Pages/EventDetail"));
const Tickets = lazy(() => import("./Pages/Tickets"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));
const OurEvents = lazy(() => import("./Pages/OurEvents"));
const Reservation = lazy(() => import("./Pages/Reservation"));
const Archives = lazy(() => import("./Pages/Archives"));
const ArchivesDetail = lazy(() => import("./Pages/ArchivesDetail"));
const Profile = lazy(() => import("./Pages/Profile"));
const Login = lazy(() => import("./Pages/Login"));
const ForgetPassword = lazy(() => import("./Pages/ForgetPassword"));
const Register = lazy(() => import("./Pages/Register"));
const LoginVerify = lazy(() => import("./Pages/LoginVerify"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));
const MyParty = lazy(() => import("./Pages/MyParty"));
const TicketInformation = lazy(() => import("./Pages/TicketInformation"));
const MyReservation = lazy(() => import("./Pages/MyReservation"));

const App = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route element={<PersistLogin />}>
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="about-us"
          element={
            <Suspense fallback={<Loading />}>
              <AboutUs />
            </Suspense>
          }
        />
        <Route
          path="news"
          element={
            <Suspense fallback={<Loading />}>
              <News />
            </Suspense>
          }
        />
        <Route
          path="my-reservation"
          element={
            <Suspense fallback={<Loading />}>
              <MyReservation />
            </Suspense>
          }
        />
        <Route
          path="my-tickets"
          element={
            <Suspense fallback={<Loading />}>
              <MyParty />
            </Suspense>
          }
        />
        <Route
          path="my-tickets/:id"
          element={
            <Suspense fallback={<Loading />}>
              <TicketInformation />
            </Suspense>
          }
        />
        <Route
          path="event/:eventId"
          element={
            <Suspense fallback={<Loading />}>
              <EventDetail />
            </Suspense>
          }
        />
        <Route
          path="event/:eventId/tickets"
          element={
            <Suspense fallback={<Loading />}>
              <Tickets />
            </Suspense>
          }
        />
        <Route
          path="contact-us"
          element={
            <Suspense fallback={<Loading />}>
              <ContactUs />
            </Suspense>
          }
        />
        <Route
          path="our-events"
          element={
            <Suspense fallback={<Loading />}>
              <OurEvents />
            </Suspense>
          }
        />
        <Route
          path="reservation"
          element={
            <Suspense fallback={<Loading />}>
              <Reservation />
            </Suspense>
          }
        />
        <Route
          path="archives"
          element={
            <Suspense fallback={<Loading />}>
              <Archives />
            </Suspense>
          }
        />
        <Route
          path="archives/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ArchivesDetail />
            </Suspense>
          }
        />
        <Route
          path="profile"
          element={
            <Suspense fallback={<Loading />}>
              <Profile />
            </Suspense>
          }
        />

        <Route
          path="account"
          element={
            <Suspense fallback={<Loading />}>
              <Account />
            </Suspense>
          }
        >
          <Route
            path="login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="verify"
            element={
              <Suspense fallback={<Loading />}>
                <Verify />
              </Suspense>
            }
          />
          <Route
            path="login/verify"
            element={
              <Suspense fallback={<Loading />}>
                <LoginVerify />
              </Suspense>
            }
          />
          <Route
            path="edit"
            element={
              <Suspense fallback={<Loading />}>
                <Edit />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="forget-password"
            element={
              <Suspense fallback={<Loading />}>
                <ForgetPassword />
              </Suspense>
            }
          />
          <Route
            path="forget-password/reset"
            element={
              <Suspense fallback={<Loading />}>
                <ResetPassword />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<p>404</p>} />
      </Route>
    </Route>
  )
);

export default App;
