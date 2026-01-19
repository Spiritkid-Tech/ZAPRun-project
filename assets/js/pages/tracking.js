/* DYNAMIC ORDER TRACKING SYSTEM */

/**
 * STEP MEANINGS (CONTROLLED BY THE BACKEND)
 * 1 - Accepted
 * 2 - On the way
 * 3 - Arrived
 * 4 - In progress
 * 5 - Completed
 */

// ---------- GET ORDER ID FROM URL ----------
const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId") || "UNKNOWN";

document.getElementById("orderIdText").textContent = orderId;

// ---------- ELEMENTS ----------
const timelineItems = document.querySelectorAll(".timeline li");
const timeline = document.getElementById("timeline");
const payBtn = document.getElementById("payBtn");
const statusIndicator = document.getElementById("statusIndicator");

// ---------- MAP ----------
mapboxgl.accessToken = "YOUR_MAPBOX_PUBLIC_KEY";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [3.3792, 6.5244], // Lagos
  zoom: 13
});

let artisanMarker;

// ---------- UPDATE UI ----------
function updateTimeline(step) {
  let completed = 0;

  timelineItems.forEach(item => {
    if (Number(item.dataset.step) <= step) {
      item.classList.add("active");
      completed++;
    } else {
      item.classList.remove("active");
    }
  });

  const percent = ((completed - 1) / (timelineItems.length - 1)) * 100;
  timeline.style.setProperty("--progress", `${percent}%`);

  if (step === 5) {
    statusIndicator.textContent = "Task completed";
    payBtn.disabled = false;
    payBtn.textContent = "Make Payment";
  } else {
    statusIndicator.textContent = "Service in progress...";
    payBtn.disabled = true;
  }
}

// ---------- UPDATE MAP ----------
function updateArtisanLocation(lat, lng) {
  if (!artisanMarker) {
    artisanMarker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
  } else {
    artisanMarker.setLngLat([lng, lat]);
  }
}

// ---------- FETCH BACKEND DATA ----------
async function fetchTrackingData() {
  try {
    const response = await fetch(
      `https://yourapi.com/orders/${orderId}/track`
    );

    const data = await response.json();

    /**
     * Expected backend response:
     * {
     *   "status": 3,
     *   "expertLat": 6.528,
     *   "expertLng": 3.375,
     *   "serviceName": "Electrician"
     * }
     */

    document.getElementById("serviceTitle").textContent =
      data.serviceName + " Service";

    updateTimeline(data.status);
    updateArtisanLocation(data.expertLat, data.expertLng);

  } catch (error) {
    console.error("Tracking error:", error);
  }
}

// ---------- MOCK DATA (REMOVE IN PRODUCTION) ----------
let mockStep = 1;
setInterval(() => {
  if (mockStep < 5) {
    mockStep++;
    updateTimeline(mockStep);
    updateArtisanLocation(
      6.5244 + Math.random() * 0.01,
      3.3792 + Math.random() * 0.01
    );
  }
}, 3000);

// ---------- PAYMENT ----------
payBtn.addEventListener("click", () => {
  if (payBtn.disabled) return;
  alert(`Proceed to payment for order ${orderId}`);
});
