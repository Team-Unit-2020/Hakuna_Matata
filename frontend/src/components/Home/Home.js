import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Button,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  UncontrolledTooltip,
} from "reactstrap";
import {
  getAllAdvertisements,
  getAdvertisementbyPlace,
  getAdvertisementbyCategory,
} from "../../services/advertisementService";
import { getHomeIcons } from "../../services/dynamicLoadingService";
import DashboardNav from "../Common/Navbars/DashboardNav";
import HomePageNav from "../Common/Navbars/HomePageNav";
import AdCard from "./AdCard";

export default function Home() {
  const [user, setUser] = useState();
  const [pills, setPills] = useState("");
  const [searchText, setSearchText] = useState("");
  const [homeIcons, setHomeIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allAds, setAllAds] = useState([]);
  const serviceSectionRef = useRef(null);

  const checkAuth = () => (localStorage.getItem("access_token") ? true : false);
  useEffect(() => {
    if (checkAuth()) {
      var localUser = JSON.parse(localStorage.getItem("user"));
      setUser(localUser);
    }
  }, []);

  useEffect(() => {
    getHomeIcons()
      .then((result) => {
        setHomeIcons(result.data);
      })
      .finally(() => {
        setLoading(false);
      });

    getAllAdvertisements().then((ads) => {
      setAllAds(ads.ads);
    });
  }, []);

  const searchBasedOnType = async () => {
    if (searchText) {
      console.log(pills);
      if (!pills) {
        let ads = await getAdvertisementbyPlace(searchText);
        setAllAds(ads.ads);
      } else {
        let ads = await getAdvertisementbyCategory(pills, searchText);
        setAllAds(ads.ads);
      }
      serviceSectionRef.current.scrollIntoView();
    }
  };

  return (
    <div>
      {checkAuth() ? (
        <DashboardNav transparent={true} user={user} />
      ) : (
        <HomePageNav />
      )}
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/header.jpg") + ")",
            backgroundRepeat: "repeat-x",
          }}
        ></div>
        <Container
          style={{
            marginTop: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Nav
            className="nav-pills-info nav-pills-just-icons"
            pills
            role="tablist"
          >
            {!loading &&
              homeIcons.map((icon) => (
                <>
                  <NavItem id={icon.name}>
                    <NavLink
                      className={pills === icon.name ? "active" : ""}
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        setPills(icon.name);
                      }}
                    >
                      <i style={{ color: "white" }} class={icon.icon}></i>
                    </NavLink>
                  </NavItem>
                  <UncontrolledTooltip
                    delay={0}
                    placement="bottom"
                    target={icon.name}
                  >
                    {icon.toolTip}
                  </UncontrolledTooltip>
                </>
              ))}
          </Nav>
        </Container>
        <Container>
          <div className="content-center brand">
            <InputGroup>
              <Input
                className="form-control-success form-control-lg"
                placeholder="Where..."
                type="text"
                onChange={(e) => setSearchText(e.target.value)}
              ></Input>
            </InputGroup>
            <div className="col text-center">
              <Button
                className="btn-round btn-white"
                color="info"
                size="lg"
                onClick={searchBasedOnType}
              >
                <i className="now-ui-icons ui-1_zoom-bold"></i> Search
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <div ref={serviceSectionRef}>
        <Container>
          {allAds.map((x) => (
            <AdCard ad={x} id={x.id} />
          ))}
        </Container>
      </div>
    </div>
  );
}
