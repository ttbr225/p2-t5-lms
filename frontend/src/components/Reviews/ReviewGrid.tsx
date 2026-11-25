import Review from "./Review";
import type { ReviewData } from "./Review";

const reviews: ReviewData[] = [
    {
        reviewId: 1,
        userId: 100,
        classId: 1,
        className: "Full Stack Web Development",
        instructorName: "Dr. Sarah Chen",
        rating: 5,
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
    },
    {
        reviewId: 2,
        userId: 101,
        classId: 2,
        className: "Data Structures",
        instructorName: "Prof. James Wilson",
        rating: 4,
        teacherScore: 4,
        contentScore: 5,
        pacingScore: 4,
        reviewText: "Very informative and well organized.",
        likes: 8,
        dislikes: 0,
        reviewerName: "Jane Smith",
        createdAt: "2026-11-05",
        modifiedAt: "2026-11-05",
        userReaction: null,
    },
    {
        reviewId: 3,
        userId: 102,
        classId: 3,
        className: "Database Systems",
        instructorName: "Dr. Michael Brown",
        rating: 3,
        teacherScore: 3,
        contentScore: 4,
        pacingScore: 2,
        reviewText: "Good content but lectures moved a bit too quickly.",
        likes: 5,
        dislikes: 2,
        reviewerName: "Alex Johnson",
        createdAt: "2026-11-07",
        modifiedAt: "2026-11-07",
        userReaction: null,
    },
];

function ReviewGrid() {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "20px",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "20px",
            }}
        >
            {reviews.map((review) => (
                <Review key={review.reviewId} initialReview={review} />
            ))}
        </div>
    );
}

export default ReviewGrid;