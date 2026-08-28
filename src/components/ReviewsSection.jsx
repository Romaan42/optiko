'use client';

import { useState, useTransition } from 'react';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function ProductReviews({ productId, initialReviews, avgRating }) {
    const { user, loading } = useSelector(state => state.user)
    const router = useRouter()
    const [reviews, setReviews] = useState(initialReviews);
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handles submission loading state seamlessly
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        if (!user && !loading) {
            return router.push("/login")

        }
        if (!comment.trim() || !author.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        startTransition(async () => {
            try {
                const res = await fetch('/api/reviews', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, rating, comment }),
                });

                const data = await res.json();

                if (!res.ok) throw new Error(data.message || 'Failed to submit review');

                // Optimistically update or append the new review
                router.refresh()
                setComment('');
                setAuthor('');
                setRating(5);
                setSuccessMessage('Thank you! Your review has been submitted.');
            } catch (err) {
                setError(err.message || 'Something went wrong.');
            }
        });
    };

    return (
        <section id="reviews" className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

            {/* Rating Header (Your original snippet integrated) */}
            <div className="flex items-center gap-3 mb-6">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={18}
                            className={i < Math.round(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-200"}
                        />
                    ))}
                </div>
                <span className="text-sm font-medium text-neutral-600">
                    {avgRating.toFixed(1)} ({reviews.length} reviews)
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Review Submission Form */}
                <form onSubmit={handleSubmit} className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
                    <h4 className="text-lg font-semibold mb-4">Leave a Review</h4>

                    {/* Interactive Star Picker */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        size={22}
                                        className={`${star <= (hoverRating || rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-neutral-300"
                                            } transition-colors`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Your Name</label>
                        <input
                            type="text"
                            value={user ? user.name : "Login first"}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            readOnly
                            className="w-full px-3 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Review</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            rows={3}
                            className="w-full px-3 py-2 border rounded-md border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
                            placeholder="What did you think of the product?"
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
                    {successMessage && <p className="text-green-600 text-sm mb-3">{successMessage}</p>}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-neutral-900 text-white py-2 rounded-md font-medium hover:bg-neutral-800 transition disabled:opacity-50 text-sm flex items-center justify-center"
                    >
                        {isPending ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-neutral-900">Recent Feedback</h4>
                        <span className="text-xs font-semibold px-2.5 py-1 bg-neutral-100 text-neutral-600 rounded-full">
                            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                        </span>
                    </div>

                    {reviews.length === 0 ? (
                        <div className="p-8 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                            <p className="text-sm text-neutral-500 font-medium">No reviews yet. Be the first to share your thoughts!</p>
                        </div>
                    ) : (
                        reviews.map((rev) => {
                            const authorName = rev?.user?.name || rev?.author || 'Anonymous';
                            const reviewDate = rev?.createdAt || rev?.date || '';

                            return (
                                <div
                                    key={rev._id || rev.id || Math.random()}
                                    className="p-5 border border-neutral-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            {/* Avatar Initial Placeholder */}
                                            <div className="w-9 h-9 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center">
                                                {authorName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <span className="font-bold text-sm text-neutral-900 block">{authorName}</span>
                                                {reviewDate && (
                                                    <span className="text-xs text-neutral-400 font-medium">{reviewDate}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Stars */}
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-200"}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-sm text-neutral-600 leading-relaxed pl-12">{rev.comment}</p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
}