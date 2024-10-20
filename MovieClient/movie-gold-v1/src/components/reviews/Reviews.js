import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import React from "react";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  let movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async () => {
    console.log(revText.current.value);
    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: revText.current.value,
        imdbId: movieId,
      });

      const updateReviews = [...reviews, revText.current.value];
      console.log(updateReviews);
      setReviews(updateReviews);
      revText.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>Reviews</h3>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <img src={movie?.poster} alt="" />
          </Col>
          <Col>
            {
              <>
                <Row>
                  <Col>
                    <ReviewForm
                      handleSubmit={addReview}
                      revText={revText}
                      labelText="Write a Review?"
                    ></ReviewForm>
                  </Col>
                </Row>
              </>
            }
            {reviews?.map((review) => {
              return (
                <>
                  <Row>
                    <Col>
                      <p>{review.body}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr></hr>
                    </Col>
                  </Row>
                </>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Reviews;
