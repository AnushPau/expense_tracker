"use client";

import { useEffect, useState } from "react";

function CardsPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    cardName: "",
    brand: "Visa",
    cardType: "Credit",
    last4: "",
  });

  const [message, setMessage] = useState("");

  // Fetch cards
  const getCards = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cards/all");
      const data = await res.json();
      setCards(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  // Add card
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!/^\d{4}$/.test(formData.last4)) {
      setMessage("Last 4 digits must be 4 numbers.");
      return;
    }

    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Error");
        return;
      }

      setMessage("Card added!");

      setFormData({
        cardName: "",
        brand: "Visa",
        cardType: "Credit",
        last4: "",
      });

      getCards();
    } catch (err) {
      setMessage("Failed to add card");
    }
  };

  // DELETE CARD
  const deleteCard = async (id) => {
  if (!confirm("Delete this card?")) return;

  try {
    const res = await fetch(`/api/cards/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("DELETE RESPONSE:", data);

    if (!res.ok) {
      setMessage(data.error || "Failed to delete card");
      return;
    }

    setMessage("Card deleted!");
    getCards();
  } catch (err) {
    console.log(err);
    setMessage("Failed to delete card");
  }
};

  // Card UI
  const Card = ({ card }) => (
    <div className="relative rounded-2xl bg-linear-to-br from-zinc-900 to-zinc-700 p-5 text-white shadow-sm">

      {/*Delete Button */}
      <button
        onClick={() => deleteCard(card.id)}
        className="absolute top-3 right-3 text-xs bg-red-500 px-2 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>

      <div className="flex justify-between mb-6">
        <p className="text-sm opacity-80">{card.cardName}</p>
        <p className="text-sm font-semibold">{card.brand}</p>
      </div>

      <div className="text-2xl tracking-widest mb-4">
        •••• •••• •••• {card.last4}
      </div>

      <div className="flex justify-between text-sm opacity-90">
        <span>{card.cardType} Card</span>
        <span>{card.brand}</span>
        
      </div>
    </div>
  );

  return (
    <div className="p-5 md:p-8 space-y-8">
      <h1 className="text-2xl font-bold">My Cards</h1>

      {/* Add Card Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border bg-white p-5 shadow-sm space-y-4"
      >
        <h2 className="text-lg font-bold">Add Card</h2>

        <input
          type="text"
          placeholder="Card Name"
          value={formData.cardName}
          onChange={(e) =>
            setFormData({ ...formData, cardName: e.target.value })
          }
          className="w-full border rounded p-2"
          required
        />

        <select
          value={formData.brand}
          onChange={(e) =>
            setFormData({ ...formData, brand: e.target.value })
          }
          className="w-full border rounded p-2"
        >
          <option>Visa</option>
          <option>Mastercard</option>
          <option>Amex</option>
          <option>Discover</option>
        </select>

        <select
          value={formData.cardType}
          onChange={(e) =>
            setFormData({ ...formData, cardType: e.target.value })
          }
          className="w-full border rounded p-2"
        >
          <option>Credit</option>
          <option>Debit</option>
        </select>

        <input
          type="text"
          maxLength={4}
          placeholder="Last 4 digits"
          value={formData.last4}
          onChange={(e) =>
            setFormData({
              ...formData,
              last4: e.target.value.replace(/\D/g, ""),
            })
          }
          className="w-full border rounded p-2"
          required
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Add Card
        </button>

        {message && <p className="text-sm">{message}</p>}
      </form>

      {/* Card List */}
      {loading ? (
        <p>Loading cards...</p>
      ) : cards.length === 0 ? (
        <p>No cards yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardsPage;