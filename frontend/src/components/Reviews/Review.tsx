import React, { useState } from "react";

interface Review {
    reviewId: number;
    userId: number;
    classId: number;

    className: string;
    instructorName?: string;

    rating: number;
    teacherScore: number;
    contentScore: number;
    pacingScore: number;

    reviewText: string;

    likes: number;
    dislikes: number;

    reviewerName: string;

    createdAt: string;
    modifiedAt: string;

    userReaction?: "LIKE" | "DISLIKE" | null;
}

const Review: React.FC = () => {
    const [review, setReview] = useState<Review>({
        reviewId: 1,
        userId: 100,
        classId: 1,
        className: "Full Stack Web Development",
        instructorName: "Dr. Sarah Chen",
        rating: 3,
        teacherScore: 5,
        contentScore: 4,
        pacingScore: 3,
        reviewText:
            "Excellent instructor. The assignments reinforced the material well.",
        likes: 12,
        dislikes: 1,
        reviewerName: "John Doe",
        createdAt: "2026-11-01",
        modifiedAt: "2026-11-01",
        userReaction: null,
    });

    const handleLike = () => {
        setReview((current) => {
            if (current.userReaction === "LIKE") {
                return {
                    ...current,
                    likes: current.likes - 1,
                    userReaction: null,
                };
            }

            if (current.userReaction === "DISLIKE") {
                return {
                    ...current,
                    likes: current.likes + 1,
                    dislikes: current.dislikes - 1,
                    userReaction: "LIKE",
                };
            }

            return {
                ...current,
                likes: current.likes + 1,
                userReaction: "LIKE",
            };
        });
    };

    const handleDislike = () => {
        setReview((current) => {
            if (current.userReaction === "DISLIKE") {
                return {
                    ...current,
                    dislikes: current.dislikes - 1,
                    userReaction: null,
                };
            }

            if (current.userReaction === "LIKE") {
                return {
                    ...current,
                    likes: current.likes - 1,
                    dislikes: current.dislikes + 1,
                    userReaction: "DISLIKE",
                };
            }

            return {
                ...current,
                dislikes: current.dislikes + 1,
                userReaction: "DISLIKE",
            };
        });
    };

    const renderStars = (rating: number): string => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    return (
        <div
            style={{
                width: "max(25vw, 350px)",
                boxSizing: "border-box",
                margin: "0 auto",
                padding: "20px",
            }}
        >
            <article
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "16px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                    }}
                >
                    <strong>{review.reviewerName}</strong>

                    <span>
                        {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                </div>

                <h2>{review.className}</h2>
                <p>Instructor: {review.instructorName}</p>

                <div
                    style={{
                        fontSize: "20px",
                        color: "#f59e0b",
                        marginBottom: "12px",
                    }}
                >
                    {renderStars(review.rating)}
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "12px",
                    }}
                >
                    <span>Teacher: {review.teacherScore}/5</span>
                    <span>Content: {review.contentScore}/5</span>
                    <span>Pacing: {review.pacingScore}/5</span>
                </div>

                <p>{review.reviewText}</p>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "12px",
                    }}
                >
                    <button
                        onClick={handleLike}
                        style={{
                            backgroundColor:
                                review.userReaction === "LIKE"
                                    ? "#16a34a"
                                    : "#e5e7eb",
                            color:
                                review.userReaction === "LIKE"
                                    ? "white"
                                    : "black",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        👍 {review.likes}
                    </button>

                    <button
                        onClick={handleDislike}
                        style={{
                            backgroundColor:
                                review.userReaction === "DISLIKE"
                                    ? "#dc2626"
                                    : "#e5e7eb",
                            color:
                                review.userReaction === "DISLIKE"
                                    ? "white"
                                    : "black",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        👎 {review.dislikes}
                    </button>
                </div>
            </article>
        </div>
    );
};

export default Review;