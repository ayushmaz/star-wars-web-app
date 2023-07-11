import { useEffect, useRef, useState } from "react";
import SpinLoader from "../assets/loaders/SpinLoader";
import List from "../components/List";
import Modal from "../components/Modal";
import ModalContent from "../components/ModalContent";
import NavBar from "../components/NavBar";
import PeopleCard from "../components/PeopleCard";
import { API_GET_STAR_WARS_CHARACTER } from "../services/services";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const [people, setPeople] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [peopleDetails, setPeopleDetails] = useState({});
  const screenEndObserver = useRef();

  const onPeopleCardClicked = (details) => {
    setShowModal(true);
    setPeopleDetails(details);
  };
  const onCloseClicked = () => {
    setShowModal(false);
    setPeopleDetails({});
  };

  useEffect(() => {
    const fetchStarWarsCharacters = async () => {
      setLoading(true);
      try {
        const { data } = await API_GET_STAR_WARS_CHARACTER(page);
        setHasNext(data.next !== null);
        if (data.results) {
          setPeople((prev) => [...prev, ...data.results]);
        }
        setPage((page) => page + 1);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (hasNext && !loading) {
            fetchStarWarsCharacters();
          }
        }
      },
      {
        threshold: 1
      }
    );

    if (screenEndObserver.current) {
      observer.observe(screenEndObserver.current);
    }

    return () => {
      if (screenEndObserver.current) {
        observer.unobserve(screenEndObserver.current);
      }
    };
  }, [screenEndObserver, page, hasNext, loading]);

  if (error) {
    //return Error Screen
  }

  return (
    <div className="homepage">
      <Modal state={showModal}>
        <ModalContent
          onCloseClicked={onCloseClicked}
          peopleDetails={peopleDetails}
        />
      </Modal>
      <NavBar />
      <div style={{ minHeight: "6rem" }}></div>
      <List
        data={people}
        Card={PeopleCard}
        onPeopleCardClicked={onPeopleCardClicked}
      />
      {!hasNext && (
        <div
          style={{ textAlign: "center", color: "var(--color-5)" }}
          className="text-header"
        >
          No more characters available
        </div>
      )}
      {loading && (
        <div className="loader-container">
          <SpinLoader />
        </div>
      )}
      <div ref={screenEndObserver}></div>
    </div>
  );
};

export default Homepage;
