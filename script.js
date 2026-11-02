(() => {
	"use strict";

	const STORAGE_KEY = "ai-emulakat-prototype-v1";
	const today = new Date();
	const isoDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	const addDays = (days) => {
		const date = new Date();
		date.setDate(date.getDate() + days);
		return isoDate(date);
	};
	const initialData = () => ({
		profile: { name: "Ayesha Khan", email: "ayesha@example.test", phone: "0300 000 0000", role: "citizen", city: "Lahore" },
		loggedIn: false,
		appointments: [
			{ id: "EM-26001", serviceId: "cnic-registration", officeId: "lahore-central", date: addDays(2), time: "10:30 AM", status: "Confirmed", citizen: "Ayesha Khan", email: "ayesha@example.test", risk: "Low", createdAt: new Date().toISOString() },
			{ id: "EM-26002", serviceId: "license-renewal", officeId: "lahore-east", date: addDays(5), time: "11:00 AM", status: "Pending", citizen: "Ayesha Khan", email: "ayesha@example.test", risk: "Medium", createdAt: new Date().toISOString() },
			{ id: "EM-25971", serviceId: "family-registration-certificate", officeId: "lahore-central", date: addDays(-8), time: "09:30 AM", status: "Completed", citizen: "Ayesha Khan", email: "ayesha@example.test", risk: "Low", createdAt: new Date().toISOString() },
			{ id: "EM-25962", serviceId: "cnic", officeId: "lahore-central", date: addDays(-17), time: "01:30 PM", status: "Cancelled", citizen: "Ayesha Khan", email: "ayesha@example.test", risk: "Low", createdAt: new Date().toISOString() },
			{ id: "EM-26003", serviceId: "vehicle-registration", officeId: "islamabad-blue", date: addDays(1), time: "09:00 AM", status: "Confirmed", citizen: "Bilal Ahmed", email: "bilal@example.test", risk: "High", createdAt: new Date().toISOString() },
			{ id: "EM-26004", serviceId: "police-verification", officeId: "karachi-south", date: addDays(1), time: "12:00 PM", status: "Confirmed", citizen: "Zara Malik", email: "zara@example.test", risk: "Medium", createdAt: new Date().toISOString() },
			{ id: "EM-26005", serviceId: "passport-renewal", officeId: "lahore-east", date: addDays(1), time: "02:00 PM", status: "Pending", citizen: "Hamza Raza", email: "hamza@example.test", risk: "Low", createdAt: new Date().toISOString() }
		],
		departments: [
			{ id: "nadra", name: "NADRA", description: "National identity and family registration services.", icon: "id-card", active: true },
			{ id: "passport-office", name: "Passport Office", description: "Passport applications, renewals, and modifications.", icon: "passport", active: true },
			{ id: "driving-license", name: "Driving License Department", description: "Driving license applications and record services.", icon: "license", active: true },
			{ id: "excise-taxation", name: "Excise & Taxation", description: "Vehicle registration and token tax services.", icon: "vehicle", active: true },
			{ id: "police-department", name: "Police Department", description: "Police character certificate and verification services.", icon: "shield", active: true },
			{ id: "birth-death-registration", name: "Birth & Death Registration", description: "Birth and death certificate registration services.", icon: "certificate", active: true }
		],
		services: [
			{ id: "cnic", departmentId: "nadra", name: "CNIC", description: "Book an appointment for a Computerized National Identity Card service.", duration: "Varies by service", icon: "id-card", active: true },
			{ id: "smart-card", departmentId: "nadra", name: "Smart Card", description: "Book an appointment for a Smart Card service.", duration: "Varies by service", icon: "smart-card", active: true },
			{ id: "family-registration-certificate", departmentId: "nadra", name: "Family Registration Certificate (FRC)", description: "Book an appointment for a Family Registration Certificate.", duration: "Varies by service", icon: "family", active: true },
			{ id: "passport-new", departmentId: "passport-office", name: "New Passport", description: "Book an appointment for a new passport service.", duration: "Varies by service", icon: "passport", active: true },
			{ id: "passport-renewal", departmentId: "passport-office", name: "Passport Renewal", description: "Book an appointment to renew a passport.", duration: "Varies by service", icon: "passport-renewal", active: true },
			{ id: "passport-modification", departmentId: "passport-office", name: "Passport Modification", description: "Book an appointment for a passport modification service.", duration: "Varies by service", icon: "passport-modification", active: true },
			{ id: "license-new", departmentId: "driving-license", name: "New License", description: "Book an appointment for a new driving license service.", duration: "Varies by service", icon: "license", active: true },
			{ id: "license-renewal", departmentId: "driving-license", name: "License Renewal", description: "Book an appointment to renew a driving license.", duration: "Varies by service", icon: "license-renewal", active: true },
			{ id: "license-duplicate", departmentId: "driving-license", name: "Duplicate License", description: "Book an appointment for a duplicate driving license service.", duration: "Varies by service", icon: "license-duplicate", active: true },
			{ id: "vehicle-registration", departmentId: "excise-taxation", name: "Vehicle Registration", description: "Book an appointment for vehicle registration.", duration: "Varies by service", icon: "vehicle", active: true },
			{ id: "token-tax", departmentId: "excise-taxation", name: "Token Tax", description: "Book an appointment related to vehicle token tax.", duration: "Varies by service", icon: "receipt", active: true },
			{ id: "police-character-certificate", departmentId: "police-department", name: "Police Character Certificate", description: "Book an appointment for a Police Character Certificate.", duration: "Varies by service", icon: "shield-certificate", active: true },
			{ id: "police-verification", departmentId: "police-department", name: "Police Verification", description: "Book an appointment for a police verification service.", duration: "Varies by service", icon: "shield-check", active: true },
			{ id: "birth-certificate", departmentId: "birth-death-registration", name: "Birth Certificate", description: "Book an appointment for birth certificate registration.", duration: "Varies by service", icon: "birth-certificate", active: true },
			{ id: "death-certificate", departmentId: "birth-death-registration", name: "Death Certificate", description: "Book an appointment for death certificate registration.", duration: "Varies by service", icon: "death-certificate", active: true }
		],
		offices: [
			{ id: "lahore-central", name: "Lahore Citizen Facilitation Centre", city: "Lahore", address: "Civic Centre, Model Town (sample address)", active: true },
			{ id: "lahore-east", name: "Lahore East Service Office", city: "Lahore", address: "Canal View, Lahore (sample address)", active: true },
			{ id: "islamabad-blue", name: "Islamabad Blue Area Office", city: "Islamabad", address: "Blue Area, Islamabad (sample address)", active: true },
			{ id: "karachi-south", name: "Karachi South Facilitation Office", city: "Karachi", address: "Shahrah-e-Faisal, Karachi (sample address)", active: true },
			{ id: "peshawar-center", name: "Peshawar Citizen Service Centre", city: "Peshawar", address: "University Road, Peshawar (sample address)", active: true }
		],
		users: [
			{ id: "U-1001", name: "Ayesha Khan", email: "ayesha@example.test", role: "Citizen", status: "Active", office: "—" },
			{ id: "U-1002", name: "Bilal Ahmed", email: "bilal@example.test", role: "Citizen", status: "Active", office: "—" },
			{ id: "U-1003", name: "Sara Iqbal", email: "sara.staff@example.test", role: "Staff", status: "Active", office: "Lahore Citizen Facilitation Centre" },
			{ id: "U-1004", name: "Omar Farooq", email: "omar.staff@example.test", role: "Staff", status: "Active", office: "Islamabad Blue Area Office" }
		],
		notifications: [
			{ id: "N-1", title: "Appointment booked", body: "Your appointment EM-26001 is scheduled for " + addDays(2) + ".", date: new Date().toISOString(), read: false },
			{ id: "N-2", title: "Appointment reminder", body: "Your government services appointment is coming up. Review any approved service information before your visit.", date: new Date().toISOString(), read: false },
			{ id: "N-3", title: "Service update", body: "Sample service information has been refreshed in this prototype.", date: new Date().toISOString(), read: true }
		],
		slots: [],
		faqs: [
			{ question: "What should I bring to my appointment?", answer: "Requirements vary by service. Open the service details before booking to review the sample checklist. Confirm exact requirements with the relevant office through official channels." },
			{ question: "Can I change my appointment?", answer: "Yes. Open Upcoming Appointments and choose Reschedule. The prototype updates the appointment locally in this browser." },
			{ question: "How do recommendations work?", answer: "This academic prototype uses a simple sample rule: it favors earlier available slots with lower sample utilization. It is not connected to a real AI model or live office capacity." },
			{ question: "Is this an official government website?", answer: "No. AI E-Mulakat is an academic prototype and is not affiliated with any government department." }
		],
		activity: [
			{ action: "Prototype data initialized", actor: "System", date: new Date().toISOString() },
			{ action: "Sample appointment EM-26001 created", actor: "Ayesha Khan", date: new Date().toISOString() }
		],
		settings: { slotInterval: "30", officeStart: "09:00", officeEnd: "16:00", reminders: true, prediction: true }
	});

	function loadData() {
		try {
			const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
			if (saved && [1, 2, 3, 4].includes(saved.version)) {
				const defaults = initialData();
				const data = { ...defaults, ...saved.data };
				if (saved.version < 4) {
					data.departments = defaults.departments;
					data.services = defaults.services;
					data.appointments = (data.appointments || []).map((appointment, index) => ({ ...appointment, serviceId: defaults.services[index % defaults.services.length].id }));
					try {
						localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 4, data }));
					} catch (error) {
						console.warn("Prototype department and service migration could not be saved.", error);
					}
				}
				return data;
			}
		} catch (error) {
			console.warn("Prototype data could not be loaded from localStorage.", error);
		}
		return initialData();
	}

	const state = {
		data: loadData(),
		role: "citizen",
		page: "public",
		modal: null,
		chatOpen: false,
		authMode: "login",
		appointmentFilter: "All",
		search: "",
		mobileMenu: false,
		booking: null
	};

	function saveData() {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 4, data: state.data }));
		} catch (error) {
			toast("Could not save in this browser. Check local storage settings.", "error");
		}
	}

	const app = document.getElementById("app");
	const modalRoot = document.getElementById("modal-root");
	const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
	const initials = (name) => String(name || "User").split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
	const roleName = (role) => ({ citizen: "Citizen", staff: "Government Staff", admin: "Administrator" }[role] || "Citizen");
	const getDepartment = (id) => state.data.departments.find((item) => item.id === id) || { id: "unknown", name: "Department", icon: "building-document", description: "Government department." };
	const getService = (id) => state.data.services.find((item) => item.id === id) || { id: "unknown-service", departmentId: state.data.departments[0]?.id, name: "Government service", description: "Select a service from the available departments.", duration: "Varies by service", icon: "building-document" };
	const getDepartmentForService = (service) => getDepartment(service.departmentId);
	const getOffice = (id) => state.data.offices.find((item) => item.id === id) || { name: "Sample government office", city: "Pakistan", address: "Sample address" };
	const formatDate = (dateString, options = { day: "numeric", month: "short", year: "numeric" }) => {
		if (!dateString) return "—";
		const date = new Date(`${dateString}T12:00:00`);
		return Number.isNaN(date.getTime()) ? escapeHtml(dateString) : new Intl.DateTimeFormat("en-PK", options).format(date);
	};
	const dateShort = (dateString) => {
		const date = new Date(`${dateString}T12:00:00`);
		return Number.isNaN(date.getTime()) ? { day: "—", month: "" } : { day: date.getDate(), month: new Intl.DateTimeFormat("en", { month: "short" }).format(date) };
	};
	const timeInMinutes = (value) => {
		const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(value || "");
		if (!match) return Number.MAX_SAFE_INTEGER;
		const hour = (Number(match[1]) % 12) + (match[3].toUpperCase() === "PM" ? 12 : 0);
		return hour * 60 + Number(match[2]);
	};
	function qrCodeSvg(value) {
		const text = String(value).toUpperCase();
		const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
		if (text.length > 25 || [...text].some((character) => !alphabet.includes(character))) {
			throw new Error("Appointment QR tokens must use up to 25 QR alphanumeric characters.");
		}
		const bits = [];
		const appendBits = (number, length) => {
			for (let bit = length - 1; bit >= 0; bit -= 1) bits.push((number >>> bit) & 1);
		};
		appendBits(0b0010, 4);
		appendBits(text.length, 9);
		for (let index = 0; index < text.length; index += 2) {
			const first = alphabet.indexOf(text[index]);
			if (index + 1 < text.length) appendBits(first * 45 + alphabet.indexOf(text[index + 1]), 11);
			else appendBits(first, 6);
		}
		const dataCapacity = 19 * 8;
		appendBits(0, Math.min(4, dataCapacity - bits.length));
		while (bits.length % 8) bits.push(0);
		const data = [];
		for (let index = 0; index < bits.length; index += 8) {
			data.push(bits.slice(index, index + 8).reduce((byte, bit) => (byte << 1) | bit, 0));
		}
		for (let pad = 0; data.length < 19; pad += 1) data.push(pad % 2 ? 0x11 : 0xec);

		const multiply = (left, right) => {
			let product = 0;
			for (let bit = 0; bit < 8; bit += 1) {
				if (right & 1) product ^= left;
				const highBit = left & 0x80;
				left = (left << 1) & 0xff;
				if (highBit) left ^= 0x1d;
				right >>>= 1;
			}
			return product;
		};
		let generator = [1];
		let root = 1;
		for (let index = 0; index < 7; index += 1) {
			const next = Array(generator.length + 1).fill(0);
			generator.forEach((coefficient, position) => {
				next[position] ^= coefficient;
				next[position + 1] ^= multiply(coefficient, root);
			});
			generator = next;
			root = multiply(root, 2);
		}
		const remainder = [...data, ...Array(7).fill(0)];
		for (let index = 0; index < data.length; index += 1) {
			const factor = remainder[index];
			generator.forEach((coefficient, offset) => { remainder[index + offset] ^= multiply(coefficient, factor); });
		}
		const codewords = [...data, ...remainder.slice(-7)];
		const size = 21;
		const matrix = Array.from({ length: size }, () => Array(size).fill(null));
		const finder = (left, top) => {
			for (let y = -1; y <= 7; y += 1) {
				for (let x = -1; x <= 7; x += 1) {
					const px = left + x;
					const py = top + y;
					if (px < 0 || py < 0 || px >= size || py >= size) continue;
					matrix[py][px] = x >= 0 && x <= 6 && y >= 0 && y <= 6 && (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4));
				}
			}
		};
		finder(0, 0);
		finder(size - 7, 0);
		finder(0, size - 7);
		for (let index = 8; index < size - 8; index += 1) {
			matrix[6][index] = index % 2 === 0;
			matrix[index][6] = index % 2 === 0;
		}
		for (let index = 0; index <= 5; index += 1) matrix[index][8] = false;
		matrix[7][8] = false;
		matrix[8][8] = false;
		matrix[8][7] = false;
		for (let index = 9; index < 15; index += 1) matrix[8][14 - index] = false;
		for (let index = 0; index < 8; index += 1) matrix[8][size - 1 - index] = false;
		for (let index = 8; index < 15; index += 1) matrix[size - 15 + index][8] = false;
		matrix[size - 8][8] = true;
		const dataBits = codewords.flatMap((byte) => Array.from({ length: 8 }, (_, bit) => (byte >>> (7 - bit)) & 1));
		let bitIndex = 0;
		for (let right = size - 1; right >= 1; right -= 2) {
			if (right === 6) right = 5;
			for (let vertical = 0; vertical < size; vertical += 1) {
				const y = ((right + 1) & 2) === 0 ? size - 1 - vertical : vertical;
				for (let offset = 0; offset < 2; offset += 1) {
					const x = right - offset;
					if (matrix[y][x] !== null) continue;
					const dataBit = bitIndex < dataBits.length ? dataBits[bitIndex] : 0;
					matrix[y][x] = dataBit ^ ((x + y) % 2 === 0 ? 1 : 0);
					bitIndex += 1;
				}
			}
		}
		const formatData = 0b01000;
		let formatRemainder = formatData << 10;
		for (let bit = 14; bit >= 10; bit -= 1) {
			if ((formatRemainder >>> bit) & 1) formatRemainder ^= 0x537 << (bit - 10);
		}
		const formatBits = ((formatData << 10) | formatRemainder) ^ 0x5412;
		for (let bit = 0; bit <= 5; bit += 1) matrix[bit][8] = ((formatBits >>> bit) & 1) === 1;
		matrix[7][8] = ((formatBits >>> 6) & 1) === 1;
		matrix[8][8] = ((formatBits >>> 7) & 1) === 1;
		matrix[8][7] = ((formatBits >>> 8) & 1) === 1;
		for (let bit = 9; bit < 15; bit += 1) matrix[8][14 - bit] = ((formatBits >>> bit) & 1) === 1;
		for (let bit = 0; bit < 8; bit += 1) matrix[8][size - 1 - bit] = ((formatBits >>> bit) & 1) === 1;
		for (let bit = 8; bit < 15; bit += 1) matrix[size - 15 + bit][8] = ((formatBits >>> bit) & 1) === 1;
		matrix[size - 8][8] = true;
		const path = matrix.flatMap((row, y) => row.flatMap((dark, x) => dark ? [`M${x} ${y}h1v1h-1z`] : [])).join("");
		return `<svg class="qr-code" viewBox="-4 -4 29 29" role="img" aria-label="QR token for appointment ${escapeHtml(text)}" xmlns="http://www.w3.org/2000/svg"><rect x="-4" y="-4" width="29" height="29" fill="#fff"/><path d="${path}" fill="#102a43"/></svg>`;
	}
	const textButton = (label, action, attrs = "") => `<button class="text-button" data-action="${action}" ${attrs}>${label}</button>`;
	const button = (label, action, kind = "", attrs = "") => `<button class="button ${kind}" data-action="${action}" ${attrs}>${label}</button>`;
	const activeAppointments = () => state.data.appointments.filter((item) => ["Confirmed", "Pending"].includes(item.status));
	const addActivity = (action) => {
		state.data.activity.unshift({ action, actor: state.data.profile.name, date: new Date().toISOString() });
		state.data.activity = state.data.activity.slice(0, 50);
	};
	function toast(message, type = "success") {
		const region = document.getElementById("toast-region");
		if (!region) return;
		const element = document.createElement("div");
		element.className = `toast ${type === "success" ? "" : type}`;
		element.textContent = message;
		region.append(element);
		window.setTimeout(() => element.remove(), 3400);
	}

	const citizenNav = [
		{ section: "Overview", items: [["dashboard", "▦", "Dashboard"], ["services", "▤", "Services"], ["appointments", "◷", "My appointments"]] },
		{ section: "Your account", items: [["notifications", "♧", "Notifications"], ["profile", "◉", "Profile"]] }
	];
	function renderLanding() {
		return `<main class="landing">
			<nav class="landing-nav"><div class="brand" data-action="home"><div class="brand-mark">م</div><div><div class="brand-name">AI E-Mulakat</div><div class="brand-subtitle">Public service appointments</div></div></div>
				<div class="landing-links"><a href="#services-preview">Services</a><a href="#about-preview">About</a><button class="button secondary small" data-action="open-auth">Sign in</button></div>
			</nav>
			<section class="landing-hero"><div class="hero-copy"><span class="hero-kicker"><span class="prototype-dot"></span> A simpler way to plan a government visit</span>
				<h1>Public services, on <span>your time.</span></h1>
				<p>Explore services, choose a convenient office and appointment slot, and keep your visit details together in one place.</p>
				<div class="hero-buttons"><button class="button" data-action="open-auth">Book an appointment <span aria-hidden="true">→</span></button><button class="button secondary" data-action="enter-demo">Explore the demo</button></div>
				<div class="hero-points"><span>Fictional demo records</span><span>Responsive by design</span><span>Transparent recommendations</span></div>
			</div><div class="hero-art" aria-hidden="true"><div class="hero-orbit"><div class="hero-orbit-center">م</div><div class="floating-stat stat-one"><strong>One place</strong><span>Services and visits</span></div><div class="floating-stat stat-two"><strong>Flexible</strong><span>Choose your time</span></div></div></div></section>
			<section class="landing-features" id="services-preview"><h2>Designed around your visit</h2><div class="feature-strip">
				<article class="feature-item"><span>▤</span><strong>Browse services</strong><p>Review sample service information and document checklists.</p></article>
				<article class="feature-item"><span>◷</span><strong>Choose a time</strong><p>See available sample slots and select what works for you.</p></article>
				<article class="feature-item"><span>✳</span><strong>Compare suggestions</strong><p>Understand why a sample time is recommended before you choose.</p></article>
				<article class="feature-item"><span>☏</span><strong>Get guidance</strong><p>Ask the prototype FAQ assistant common booking questions.</p></article>
			</div></section>
			<footer class="landing-footer" id="about-preview">Academic prototype only. Not an official government website and not affiliated with a government department. All people, records, locations, and activity shown are fictional.</footer>
		</main>`;
	}

	function renderAuth() {
		const register = state.authMode === "register";
		return `<div class="app-shell"><header class="topbar"><div class="brand" data-action="home"><div class="brand-mark">م</div><div><div class="brand-name">AI E-Mulakat</div><div class="brand-subtitle">Academic prototype</div></div></div><button class="button secondary small" data-action="home">← Back to home</button></header>
			<main class="main-content" style="padding-top:48px"><section class="auth-panel"><div class="eyebrow">${register ? "Create your account" : "Welcome back"}</div><h2>${register ? "Start with a demo profile" : "Sign in to your portal"}</h2><p>Use fictional details only. This prototype does not verify identities or communicate with government systems.</p>
				<div class="auth-tabs"><button class="auth-tab ${register ? "" : "active"}" data-action="auth-mode" data-value="login">Sign in</button><button class="auth-tab ${register ? "active" : ""}" data-action="auth-mode" data-value="register">Register</button></div>
				<form class="auth-form" id="auth-form" novalidate>${register ? `<div class="field"><label for="auth-name">Full name</label><input id="auth-name" name="name" autocomplete="name" required minlength="2" placeholder="e.g. Ayesha Khan"></div>` : ""}
					<div class="field"><label for="auth-email">Email address</label><input id="auth-email" name="email" type="email" autocomplete="email" required placeholder="name@example.test"></div>
					<div class="field"><label for="auth-password">Password</label><input id="auth-password" name="password" type="password" autocomplete="${register ? "new-password" : "current-password"}" required minlength="6" placeholder="At least 6 characters"></div>
					<div class="field"><label for="auth-role">Demo portal</label><select id="auth-role" name="role"><option value="citizen">Citizen</option><option value="staff">Government staff</option><option value="admin">Administrator</option></select><small>Role selection is for interface demonstration only.</small></div>
					<button class="button" type="submit">${register ? "Create demo profile" : "Continue to portal"} <span aria-hidden="true">→</span></button>
				</form><div class="auth-note">Do not enter a real CNIC, password, or sensitive personal information. Sample email addresses ending in <strong>.test</strong> are safe to use.</div>
			</section></main></div>`;
	}

	function renderShell() {
		const profile = state.data.profile;
		const unread = state.data.notifications.filter((item) => !item.read).length;
		const nav = navForRole();
		const view = renderPage();
		return `<div class="app-shell"><header class="topbar"><button class="mobile-menu" data-action="toggle-menu" aria-label="Open navigation">☰</button><div class="brand" data-action="go-page" data-page="dashboard"><div class="brand-mark">م</div><div><div class="brand-name">AI E-Mulakat</div><div class="brand-subtitle">Appointment services</div></div></div>
			<div class="topbar-tools"><label class="search-wrap"><span class="search-glyph" aria-hidden="true">⌕</span><input id="global-search" type="search" placeholder="Search this view" aria-label="Search this view" value="${escapeHtml(state.search)}"></label>
				<select class="role-select" id="role-select" aria-label="Switch demo portal"><option value="citizen" ${state.role === "citizen" ? "selected" : ""}>Citizen portal</option><option value="staff" ${state.role === "staff" ? "selected" : ""}>Staff portal</option><option value="admin" ${state.role === "admin" ? "selected" : ""}>Admin portal</option></select>
				<button class="icon-button desktop-notification" data-action="go-page" data-page="notifications" aria-label="Notifications">♧${unread ? `<span class="notification-dot"></span>` : ""}</button>
				<button class="user-chip" data-action="go-page" data-page="profile" style="border:0;background:transparent;text-align:left"><span class="avatar">${escapeHtml(initials(profile.name))}</span><span><span class="user-name">${escapeHtml(profile.name)}</span><span class="user-role">${escapeHtml(roleName(state.role))}</span></span></button>
			</div></header>
			<div class="workspace"><aside class="sidebar ${state.mobileMenu ? "mobile-open" : ""}"><div class="sidebar-label">${escapeHtml(roleName(state.role))} workspace</div><nav class="side-nav">${nav.map((section) => `<div class="sidebar-label">${escapeHtml(section.section)}</div>${section.items.map(([page, icon, label]) => `<button class="nav-item ${state.page === page ? "active" : ""}" data-action="go-page" data-page="${page}"><span class="nav-icon">${icon}</span><span>${escapeHtml(label)}</span>${page === "notifications" && unread ? `<span class="status" style="margin-left:auto;padding:3px 6px">${unread}</span>` : ""}</button>`).join("")}`).join("")}</nav><div class="sidebar-footer">Academic prototype · Fictional sample data<br>Not an official government website</div></aside><main class="main-content">${view}</main></div>
			<nav class="mobile-nav">${mobileNav().map(([page, icon, label]) => `<button class="${state.page === page ? "active" : ""}" data-action="go-page" data-page="${page}"><span>${icon}</span><span>${label}</span></button>`).join("")}</nav>
			<button class="chat-fab" data-action="toggle-chat" aria-label="Open FAQ assistant">☏</button>${state.chatOpen ? renderChatWindow() : ""}
		</div>`;
	}

	function mobileNav() {
		if (state.role === "admin") return [["dashboard", "▦", "Home"], ["appointments", "◷", "Bookings"], ["users", "♙", "Users"], ["optimizer", "✳", "AI"]];
		if (state.role === "staff") return [["dashboard", "▦", "Home"], ["schedule", "▤", "Today"], ["queue", "⇥", "Queue"], ["appointments", "◷", "Bookings"]];
		return [["dashboard", "▦", "Home"], ["services", "▤", "Services"], ["appointments", "◷", "Visits"], ["notifications", "♧", "Inbox"]];
	}

	const pageMeta = {
		dashboard: ["Dashboard", "Your appointment activity and service shortcuts."],
		services: ["Services", "Browse departments and services available for appointment booking."],
		appointments: ["Appointments", "Review, manage, and update appointment records."],
		schedule: ["Daily schedule", "Appointments and check-in activity for the selected day."],
		queue: ["Queue management", "Check in and call the next citizen from the shared appointment list."],
		predictions: ["No-show estimates", "Sample risk indicators for upcoming appointments."],
		notifications: ["Notifications", "Updates associated with this prototype profile."],
		profile: ["Profile", "Manage the fictional profile used in this browser demo."],
		analytics: ["Analytics & reports", "Illustrative service activity generated from sample records."],
		optimizer: ["Slot optimizer", "Sample utilization and scheduling suggestions."],
		users: ["Users & staff", "Manage fictional user and staff records."],
		departments: ["Departments", "Manage the six government departments in this prototype."],
		services: ["Services", "Manage services and their department assignments."],
		offices: ["Government offices", "Manage fictional office locations used in the prototype."],
		slots: ["Schedule & slots", "Configure sample office appointment slots."],
		chatbot: ["FAQ management", "Manage sample questions used by the local FAQ assistant."],
		activity: ["Activity logs", "A local-only record of actions in this browser prototype."],
		permissions: ["Roles & permissions", "Review the role access model represented in this demo."],
		settings: ["System settings", "Local interface settings for the prototype."]
	};

	function pageHeader(page, actions = "") {
		const [title, description] = pageMeta[page] || ["Workspace", "Manage sample data."];
		return `<div class="page-heading"><div><div class="eyebrow">${escapeHtml(roleName(state.role))} portal</div><h1>${escapeHtml(title)}</h1><p class="page-description">${escapeHtml(description)}</p></div><div class="heading-actions">${actions}</div></div>`;
	}

	function renderPage() {
		switch (state.page) {
			case "dashboard": return renderDashboard();
			case "services": return renderServices();
			case "appointments": return renderAppointments();
			case "schedule": return renderSchedule();
			case "queue": return renderQueue();
			case "predictions": return renderPredictions();
			case "notifications": return renderNotifications();
			case "profile": return renderProfile();
			case "analytics": return renderAnalytics();
			case "optimizer": return renderOptimizer();
			case "users": return renderManagement("users");
			case "departments": return renderManagement("departments");
			case "servicesAdmin": return renderManagement("services");
			case "offices": return renderManagement("offices");
			case "slots": return renderSlots();
			case "chatbot": return renderManagement("faqs");
			case "activity": return renderActivity();
			case "permissions": return renderPermissions();
			case "settings": return renderSettings();
			default: state.page = "dashboard"; return renderDashboard();
		}
	}

	function metric(label, value, note, icon) {
		return `<article class="metric-card"><div class="metric-top"><span>${escapeHtml(label)}</span><span class="metric-icon">${icon}</span></div><div class="metric-value">${escapeHtml(value)}</div><div class="metric-foot">${note}</div></article>`;
	}
	function statusClass(status) {
		return String(status).toLowerCase().replace(/\s+/g, "-");
	}
	function appointmentRow(item, mode = "citizen") {
		const date = dateShort(item.date);
		const service = getService(item.serviceId);
		const department = getDepartmentForService(service);
		const office = getOffice(item.officeId);
		const manage = mode === "citizen" ? `<button class="button secondary small" data-action="appointment-detail" data-id="${escapeHtml(item.id)}">View</button>` : `<button class="button secondary small" data-action="appointment-detail" data-id="${escapeHtml(item.id)}">Details</button>`;
		return `<article class="appointment-row" data-searchable data-search="${escapeHtml([item.id, item.citizen, service.name, department.name, office.name, item.status].join(" ").toLowerCase())}"><div class="date-tile"><strong>${date.day}</strong><span>${escapeHtml(date.month)}</span></div><div><div class="row-title">${escapeHtml(service.name)} <span class="row-subtitle">· ${escapeHtml(item.time)}</span></div><div class="row-subtitle">${escapeHtml(department.name)} · ${escapeHtml(office.name)}${mode !== "citizen" ? ` · ${escapeHtml(item.citizen)}` : ""} · Ref ${escapeHtml(item.id)}</div></div><div class="row-actions"><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span>${manage}</div></article>`;
	}
	function rowsEmpty(message = "No appointments to display.") {
		return `<div class="empty-state"><div class="empty-symbol">◷</div><strong>Nothing here yet</strong><p>${escapeHtml(message)}</p></div>`;
	}
	function renderDashboard() {
		if (state.role === "staff") return renderStaffDashboard();
		if (state.role === "admin") return renderAdminDashboard();
		const upcoming = activeAppointments().filter((item) => item.citizen === state.data.profile.name && item.date >= isoDate(new Date())).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
		const current = state.data.appointments.filter((item) => item.citizen === state.data.profile.name);
		const recommended = recommendSlots(state.data.profile.city, addDays(3))[0];
		const recOffice = getOffice(recommended.officeId);
		const recDate = new Date(`${recommended.date}T12:00:00`);
		const recTime = recommended.time;
		return `${pageHeader("dashboard", button("＋ Book appointment", "start-booking"))}
			<section class="grid metric-grid">${metric("Upcoming appointments", String(activeAppointments().filter((item) => item.citizen === state.data.profile.name).length), `<span class="positive">View your schedule</span>`, "◷")}${metric("Available services", String(state.data.services.filter((item) => item.active).length), "Across sample departments", "▤")}${metric("Notifications", String(state.data.notifications.filter((item) => !item.read).length), "Unread updates", "♧")}${metric("Profile status", "Demo", "No identity verification", "◉")}</section>
			<div class="grid dashboard-grid"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Upcoming appointments</h2><p class="panel-note">Your next scheduled visits</p></div>${textButton("See all", "go-page", `data-page="appointments"`)}</div><div class="appointment-list">${upcoming.length ? upcoming.map((item) => appointmentRow(item)).join("") : rowsEmpty("Book a service to see it listed here.")}</div></section>
			<div class="grid"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">A useful time to consider</h2><p class="panel-note">Based on fictional sample availability</p></div></div><div class="panel-body"><div class="recommendation"><div class="recommendation-head"><span class="ai-label">✳ Sample slot suggestion</span><span class="status low">Lower demand</span></div><div class="recommendation-date">${escapeHtml(new Intl.DateTimeFormat("en-PK", { weekday: "short", day: "numeric", month: "short" }).format(recDate))}</div><div class="recommendation-time">${escapeHtml(recTime)} · ${escapeHtml(recOffice.city)} office</div><ul class="reason-list"><li>Available in the sample schedule</li><li>Earlier than other open times that day</li><li>Office is within your selected city</li></ul><div class="disclaimer">Illustrative rule-based suggestion only. It does not reflect live capacity or a real AI service.</div><div style="margin-top:13px">${button("Compare slots", "start-booking", "small")}</div></div></div></section>
			<section class="panel"><div class="panel-header"><h2 class="panel-title">Quick access</h2></div><div class="panel-body"><div class="quick-actions"><button class="quick-action" data-action="go-page" data-page="services"><span>▤</span>Browse services</button><button class="quick-action" data-action="go-page" data-page="appointments"><span>◷</span>Manage visits</button><button class="quick-action" data-action="go-page" data-page="notifications"><span>♧</span>Notifications</button><button class="quick-action" data-action="toggle-chat"><span>☏</span>Ask a question</button></div></div></section></div></div>`;
	}

	function renderStaffDashboard() {
		const todayAppointments = state.data.appointments.filter((item) => item.date === isoDate(new Date()) && ["Confirmed", "Pending"].includes(item.status));
		const nextAppointments = state.data.appointments.filter((item) => ["Confirmed", "Pending"].includes(item.status)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
		const riskHigh = activeAppointments().filter((item) => item.risk === "High").length;
		return `${pageHeader("dashboard", button("Open daily schedule", "go-page", "secondary", `data-page="schedule"`))}<section class="grid metric-grid">${metric("Today's appointments", String(todayAppointments.length), "Across sample office schedules", "◷")}${metric("Awaiting check-in", String(todayAppointments.filter((item) => item.status === "Confirmed").length), "Demo status only", "✓")}${metric("Pending requests", String(state.data.appointments.filter((item) => item.status === "Pending").length), "Review sample requests", "◌")}${metric("High risk estimates", String(riskHigh), "Not a confirmed outcome", "◉")}</section>
			<div class="grid dashboard-grid"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Upcoming schedule</h2><p class="panel-note">Fictional appointments across sample offices</p></div>${textButton("View schedule", "go-page", `data-page="schedule"`)}</div><div class="appointment-list">${nextAppointments.length ? nextAppointments.map((item) => appointmentRow(item, "staff")).join("") : rowsEmpty()}</div></section>
			<div class="grid"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Appointment check-in</h2><p class="panel-note">Update demo records from the appointment list</p></div></div><div class="panel-body"><div class="disclaimer">Check-in, no-show, and status changes are simulated and are not sent to any office.</div><div style="margin-top:13px">${button("Manage appointments", "go-page", "secondary", `data-page="appointments"`)}</div></div></section><section class="panel"><div class="panel-header"><h2 class="panel-title">Weekly appointment activity</h2></div><div class="panel-body">${miniBars()}</div></section></div></div>`;
	}

	function renderAdminDashboard() {
		const appointments = state.data.appointments;
		const upcoming = activeAppointments().filter((item) => item.date >= isoDate(new Date())).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
		const high = activeAppointments().filter((item) => item.risk === "High").length;
		return `${pageHeader("dashboard", button("＋ Add department", "add-record", "secondary", `data-kind="departments"`))}<section class="grid metric-grid">${metric("Appointment records", String(appointments.length), "Sample records in this browser", "◷")}${metric("Active departments", String(state.data.departments.filter((item) => item.active).length), `${state.data.services.filter((item) => item.active).length} active services`, "▤")}${metric("Users & staff", String(state.data.users.length), "Fictional accounts", "♙")}${metric("High no-show estimates", String(high), "Illustrative, not definitive", "◉")}</section>
			<div class="grid dashboard-grid"><div class="grid"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Appointment activity</h2><p class="panel-note">Illustrative sample volume by weekday</p></div>${textButton("View analytics", "go-page", `data-page="analytics"`)}</div><div class="chart-area">${miniBars()}<div class="disclaimer">Sample visualization only. No live government data or predictive model is connected.</div></div></section><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Upcoming appointments</h2><p class="panel-note">Current active sample bookings</p></div>${textButton("Manage", "go-page", `data-page="appointments"`)}</div><div class="appointment-list">${upcoming.map((item) => appointmentRow(item, "staff")).join("") || rowsEmpty()}</div></section></div>
			<div class="grid"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Scheduling signal</h2><p class="panel-note">Rule-based sample recommendation</p></div></div><div class="panel-body"><div class="recommendation"><div class="recommendation-head"><span class="ai-label">✳ Optimizer</span><span class="status low">Prototype</span></div><div class="recommendation-date">Spread demand by office</div><p class="row-subtitle" style="margin-top:7px">The sample schedule has room to distribute upcoming bookings across offices and morning slots.</p><div class="disclaimer">Not a real AI model. Do not use for staffing or policy decisions.</div><div style="margin-top:12px">${button("Open optimizer", "go-page", "small", `data-page="optimizer"`)}</div></div></div></section><section class="panel"><div class="panel-header"><h2 class="panel-title">Management shortcuts</h2></div><div class="panel-body"><div class="quick-actions"><button class="quick-action" data-action="go-page" data-page="users"><span>♙</span>Users & staff</button><button class="quick-action" data-action="go-page" data-page="departments"><span>▤</span>Departments</button><button class="quick-action" data-action="go-page" data-page="offices"><span>⌖</span>Offices</button><button class="quick-action" data-action="go-page" data-page="slots"><span>▦</span>Slots</button></div></div></section></div></div>`;
	}

	function miniBars() {
		const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
		const counts = labels.map((_, weekday) => state.data.appointments.filter((item) => {
			const date = new Date(`${item.date}T12:00:00`);
			return !Number.isNaN(date.getTime()) && (date.getDay() + 6) % 7 === weekday;
		}).length);
		const maxCount = Math.max(1, ...counts);
		return `<div class="bar-chart" role="img" aria-label="Local appointment records by weekday">${counts.map((count, index) => {
			const height = count ? Math.max(12, Math.round((count / maxCount) * 100)) : 4;
			const unit = count === 1 ? "record" : "records";
			return `<div class="bar-group"><div class="bar ${index % 2 ? "alt" : ""}" style="height:${height}%" title="${count} local appointment ${unit}"></div><span class="bar-label">${labels[index]}</span></div>`;
		}).join("")}</div><div class="legend"><span>Local appointment records</span><span>Relative weekly count</span></div>`;
	}

	function renderServices() {
		const departments = state.data.departments.filter((item) => item.active);
		const departmentIds = new Set(departments.map((item) => item.id));
		const services = state.data.services.filter((item) => item.active && departmentIds.has(item.departmentId));
		const actions = state.role === "admin" ? button("＋ Add service", "add-record", "secondary", `data-kind="services"`) : "";
		const cards = services.map((item) => {
			const department = getDepartmentForService(item);
			return `<article class="service-card" data-service-card data-searchable data-search="${escapeHtml((item.name + " " + item.description + " " + department.name).toLowerCase())}" data-category="${escapeHtml(department.id)}">
				<div class="service-card-top"><span class="service-icon">${serviceIcon(item.icon)}</span><span class="service-category">${escapeHtml(department.name)}</span></div>
				<h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p>
				<div class="service-meta"><span class="service-meta-icon" aria-hidden="true">◷</span> Typical visit · ${escapeHtml(item.duration || "Varies by service")}</div>
				<div class="service-foot"><button class="text-button" data-action="service-details" data-id="${escapeHtml(item.id)}">Service details</button>${state.role === "citizen" ? `<button class="button small" data-action="book-service" data-id="${escapeHtml(item.id)}">Book appointment <span aria-hidden="true">→</span></button>` : ""}</div>
			</article>`;
		}).join("");
		const serviceLabel = services.length === 1 ? "service" : "services";
		return `${pageHeader("services", actions)}<div class="toolbar"><div class="toolbar-group"><input class="toolbar-search" id="service-search" type="search" placeholder="Search services" aria-label="Search services"><select class="toolbar-select" id="service-category"><option value="all">All departments</option>${departments.map((department) => `<option value="${escapeHtml(department.id)}">${escapeHtml(department.name)}</option>`).join("")}</select></div><span class="row-subtitle">${services.length} ${serviceLabel} across ${departments.length} departments</span></div><div class="grid service-grid" id="service-grid" style="padding-top:16px">${cards || rowsEmpty("No active services have been added.")}</div>`;
	}

	function serviceIcon(icon) {
		const paths = {
			"id-card": '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M5.5 16c.6-1.6 1.6-2.4 3-2.4s2.4.8 3 2.4M14 9h4M14 12h4M14 15h2"/>',
			"smart-card": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M7 14h4M7 16h7M17 13v4"/>',
			family: '<circle cx="12" cy="8" r="3"/><circle cx="5" cy="10" r="2"/><circle cx="19" cy="10" r="2"/><path d="M6 20c.4-3 2.4-4.5 6-4.5s5.6 1.5 6 4.5M2 19c.2-2 1.2-3.2 3.3-3.5M22 19c-.2-2-1.2-3.2-3.3-3.5"/>',
			passport: '<path d="M6 3.5h11.5A2.5 2.5 0 0 1 20 6v14H7a3 3 0 0 1-3-3V6.5a3 3 0 0 1 3-3z"/><path d="M7 3.5v13a3.5 3.5 0 0 0-3 3.5M11 8h5M11 11h5"/><circle cx="13.5" cy="15.5" r="2"/>',
			"passport-renewal": '<path d="M6 3.5h11.5A2.5 2.5 0 0 1 20 6v14H7a3 3 0 0 1-3-3V6.5a3 3 0 0 1 3-3z"/><path d="M7 3.5v13a3.5 3.5 0 0 0-3 3.5M11 8h5"/><path d="M14 14a3 3 0 0 1 5 2M19 16l-.2-2-2 .4"/>',
			"passport-modification": '<path d="M6 3.5h11.5A2.5 2.5 0 0 1 20 6v14H7a3 3 0 0 1-3-3V6.5a3 3 0 0 1 3-3z"/><path d="M7 3.5v13a3.5 3.5 0 0 0-3 3.5M11 8h5M12 16l4-4 2 2-4 4-2 .5z"/>',
			license: '<path d="m4 14 1.5-5h13l1.5 5v5h-2v-2H6v2H4zM5.5 14h13M7 9l1.5-3h7L17 9"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/>',
			"license-renewal": '<path d="m4 14 1.5-5h13l1.5 5v5h-2v-2H6v2H4zM5.5 14h13M7 9l1.5-3h7L17 9"/><path d="M18 5a3 3 0 0 1 3 3M21 8l-1.5-1.5"/>',
			"license-duplicate": '<rect x="6" y="4" width="14" height="16" rx="2"/><path d="M9 8h8M9 11h8M9 15h4M4 8v12a2 2 0 0 0 2 2"/>',
			vehicle: '<path d="m3 15 1.5-5h15L21 15v4h-2v-2H5v2H3zM4.5 15h15M7 10l1.5-3h7l1.5 3"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/>',
			receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 11h6M9 14h3"/>',
			shield: '<path d="M12 3 20 6v5c0 5-3.3 8-8 10-4.7-2-8-5-8-10V6z"/><path d="M9 12h6M12 9v6"/>',
			"shield-certificate": '<path d="M12 3 20 6v5c0 5-3.3 8-8 10-4.7-2-8-5-8-10V6z"/><path d="M9 9h6M9 12h6M9 15h3"/>',
			"shield-check": '<path d="M12 3 20 6v5c0 5-3.3 8-8 10-4.7-2-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/>',
			"birth-certificate": '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h3M15 11h1M8 16h8M12 12v4M10 14h4"/>',
			"death-certificate": '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5M9 20v1l3-1 3 1v-1"/>',
			"building-document": '<path d="M4 21V4h11v17M15 10h5v11M7 8h2M11 8h1M7 12h2M11 12h1M7 16h2M11 16h1"/><path d="M8 21v-2h3v2"/>'
		};
		return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[icon] || paths["building-document"]}</svg>`;
	}

	function renderAppointments() {
		const isCitizen = state.role === "citizen";
		const source = state.data.appointments.filter((item) => !isCitizen || item.citizen === state.data.profile.name);
		const filtered = source.filter((item) => state.appointmentFilter === "All" || item.status === state.appointmentFilter).sort((a, b) => b.date.localeCompare(a.date));
		const actions = isCitizen ? button("＋ Book appointment", "start-booking") : "";
		return `${pageHeader("appointments", actions)}<section class="panel"><div class="toolbar"><div class="toolbar-group"><select class="toolbar-select" id="appointment-filter" aria-label="Filter by status">${["All", "Confirmed", "Pending", "Completed", "Cancelled", "No-show"].map((item) => `<option ${state.appointmentFilter === item ? "selected" : ""}>${item}</option>`).join("")}</select><input class="toolbar-search" id="appointment-search" type="search" placeholder="Search appointment or citizen" aria-label="Search appointments" value="${escapeHtml(state.search)}"></div><span class="row-subtitle">${filtered.length} records</span></div>
			${filtered.length ? `<div class="appointment-list">${filtered.map((item) => appointmentRow(item, isCitizen ? "citizen" : "staff")).join("")}</div>` : rowsEmpty(isCitizen ? "Your appointments will appear here after booking." : "No records match this filter.")}</section>`;
	}

	function renderSchedule() {
		const selectedDate = state.scheduleDate || isoDate(new Date());
		const schedule = state.data.appointments.filter((item) => item.date === selectedDate && !["Cancelled"].includes(item.status)).sort((a, b) => timeInMinutes(a.time) - timeInMinutes(b.time));
		return `${pageHeader("schedule", `<input class="toolbar-select" id="schedule-date" type="date" value="${escapeHtml(selectedDate)}" aria-label="Schedule date">`)}<div class="grid dashboard-grid"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">${escapeHtml(formatDate(selectedDate, { weekday: "long", day: "numeric", month: "long", year: "numeric" }))}</h2><p class="panel-note">${schedule.length} appointment records</p></div></div>${schedule.length ? `<div class="appointment-list">${schedule.map((item) => appointmentRow(item, "staff")).join("")}</div>` : rowsEmpty("There are no appointments for this date in the sample data.")}</section><div class="grid"><section class="panel"><div class="panel-header"><h2 class="panel-title">Daily overview</h2></div><div class="panel-body"><div class="profile-detail"><span>Confirmed</span><strong>${schedule.filter((item) => item.status === "Confirmed").length}</strong></div><div class="profile-detail"><span>Pending</span><strong>${schedule.filter((item) => item.status === "Pending").length}</strong></div><div class="profile-detail"><span>Checked in</span><strong>${schedule.filter((item) => item.status === "Checked in").length}</strong></div><p class="disclaimer" style="margin-top:12px">This schedule uses fictional records and is not synced to an office.</p></div></section><section class="panel"><div class="panel-header"><h2 class="panel-title">Check-in workflow</h2></div><div class="panel-body"><p class="page-description">Open an appointment’s details to check in a citizen or update the sample status.</p><div style="margin-top:13px">${button("Open appointment list", "go-page", "secondary", `data-page="appointments"`)}</div></div></section></div></div>`;
	}

	function renderQueue() {
		const selectedDate = state.queueDate || isoDate(new Date());
		const queueStatuses = ["Pending", "Confirmed", "Checked in", "In service"];
		const queue = state.data.appointments.filter((item) => item.date === selectedDate && queueStatuses.includes(item.status)).sort((a, b) => timeInMinutes(a.time) - timeInMinutes(b.time));
		const serving = queue.find((item) => item.status === "In service");
		const waiting = queue.filter((item) => item.status === "Checked in");
		const awaitingCheckIn = queue.filter((item) => ["Pending", "Confirmed"].includes(item.status));
		const rows = queue.map((item, index) => {
			const token = `Q-${String(index + 1).padStart(3, "0")}`;
			let actions = "";
			if (["Pending", "Confirmed"].includes(item.status)) actions = `<button class="button secondary small" data-action="queue-check-in" data-id="${escapeHtml(item.id)}">Check in</button>`;
			if (item.status === "Checked in" && !serving) actions = `<button class="button small" data-action="queue-call" data-id="${escapeHtml(item.id)}">Call next</button>`;
			if (item.status === "In service") actions = `<button class="button secondary small" data-action="queue-status" data-status="Completed" data-id="${escapeHtml(item.id)}">Complete</button><button class="button danger small" data-action="queue-status" data-status="No-show" data-id="${escapeHtml(item.id)}">No-show</button>`;
			const service = getService(item.serviceId);
			return `<tr><td><strong class="queue-token">${token}</strong></td><td><strong>${escapeHtml(item.citizen)}</strong><small style="display:block;color:var(--muted);margin-top:3px">${escapeHtml(getDepartmentForService(service).name)} · ${escapeHtml(service.name)}</small></td><td>${escapeHtml(item.time)}</td><td>${escapeHtml(getOffice(item.officeId).name)}</td><td><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td><td><div class="table-actions">${actions}<button class="button secondary small" data-action="appointment-detail" data-id="${escapeHtml(item.id)}">Details</button></div></td></tr>`;
		}).join("");
		const callNextAttrs = `data-id="${escapeHtml(waiting[0]?.id || "")}" ${serving || !waiting.length ? "disabled" : ""}`;
		return `${pageHeader("queue", `<input class="toolbar-select" id="queue-date" type="date" value="${escapeHtml(selectedDate)}" aria-label="Queue date">`)}
			<section class="grid metric-grid queue-metrics">${metric("Checked in", String(waiting.length), "Waiting to be called", "✓")}${metric("Now serving", serving ? serving.citizen : "—", serving ? `Token ${queue.findIndex((item) => item.id === serving.id) + 1}` : "No active appointment", "⇥")}${metric("Scheduled", String(queue.length), `For ${formatDate(selectedDate)}`, "◷")}${metric("Awaiting check-in", String(awaitingCheckIn.length), "Pending or confirmed", "◌")}</section>
			<section class="panel queue-panel"><div class="panel-header"><div><h2 class="panel-title">Appointment queue</h2><p class="panel-note">Sorted by appointment time · shared demo records</p></div><div class="heading-actions">${button("Call next checked-in", "queue-call", "", callNextAttrs)}</div></div><div class="table-wrap"><table><thead><tr><th>Queue token</th><th>Citizen / service</th><th>Time</th><th>Office</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows || `<tr><td colspan="6"><div class="empty-state"><div class="empty-symbol">⇥</div><strong>Queue is clear</strong><p>No appointments are scheduled for this date in the sample records.</p></div></td></tr>`}</tbody></table></div><div class="queue-note"><span class="prototype-dot"></span> Check in a confirmed appointment to make it eligible for “Call next”. Queue changes are saved in this browser only.</div></section>`;
	}

	function renderPredictions() {
		const upcoming = activeAppointments().filter((item) => item.date >= isoDate(new Date())).sort((a, b) => a.date.localeCompare(b.date));
		const low = upcoming.filter((item) => item.risk === "Low").length;
		const medium = upcoming.filter((item) => item.risk === "Medium").length;
		const high = upcoming.filter((item) => item.risk === "High").length;
		return `${pageHeader("predictions")}<div class="risk-summary"><div class="risk-box"><span class="status low">Low estimate</span><strong>${low}</strong><span>sample appointments</span></div><div class="risk-box"><span class="status medium">Medium estimate</span><strong>${medium}</strong><span>sample appointments</span></div><div class="risk-box"><span class="status high">High estimate</span><strong>${high}</strong><span>sample appointments</span></div></div><div class="disclaimer" style="margin-bottom:15px">These fictional risk labels are illustrative estimates only. They are not produced by a validated model, do not predict an individual's behavior, and must not be used to deny service or make decisions about people.</div><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Upcoming sample records</h2><p class="panel-note">Risk category shown as a UI demonstration</p></div></div><div class="table-wrap"><table><thead><tr><th>Reference</th><th>Appointment</th><th>Citizen</th><th>Office</th><th>Estimate</th></tr></thead><tbody>${upcoming.map((item) => `<tr><td><strong>${escapeHtml(item.id)}</strong></td><td>${escapeHtml(formatDate(item.date))} · ${escapeHtml(item.time)}</td><td>${escapeHtml(item.citizen)}</td><td>${escapeHtml(getOffice(item.officeId).city)}</td><td><span class="status ${statusClass(item.risk)}">${escapeHtml(item.risk)}</span></td></tr>`).join("") || `<tr><td colspan="5">No upcoming appointments.</td></tr>`}</tbody></table></div></section>`;
	}

	function renderNotifications() {
		const items = state.data.notifications;
		const actions = `${state.role === "admin" ? button("＋ Create sample notification", "create-notification") : ""}${button("Mark all as read", "mark-all-read", "secondary")}`;
		return `${pageHeader("notifications", actions)}<section class="panel"><div class="panel-header"><div><h2 class="panel-title">Recent updates</h2><p class="panel-note">${items.filter((item) => !item.read).length} unread · Saved in this browser</p></div></div>${items.length ? items.map((item) => `<article class="notification-item" data-searchable data-search="${escapeHtml((item.title + " " + item.body).toLowerCase())}"><span class="notification-mark">♧</span><div class="notification-copy"><strong>${escapeHtml(item.title)} ${!item.read ? `<span class="status unread">New</span>` : ""}</strong><p>${escapeHtml(item.body)}</p><time>${escapeHtml(new Intl.DateTimeFormat("en-PK", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.date)))}</time></div>${!item.read ? `<button class="text-button" data-action="mark-read" data-id="${escapeHtml(item.id)}">Mark read</button>` : ""}</article>`).join("") : rowsEmpty("You are all caught up.")}</section><p class="row-subtitle" style="margin-top:12px">No email or SMS messages are sent by this prototype.</p>`;
	}

	function renderProfile() {
		const p = state.data.profile;
		const title = state.role === "citizen" ? "Profile" : `${roleName(state.role)} profile`;
		return `${pageHeader("profile", button("Edit profile", "edit-profile", "secondary"))}<div class="profile-layout"><section class="panel profile-summary"><span class="avatar">${escapeHtml(initials(p.name))}</span><h2>${escapeHtml(p.name)}</h2><p>${escapeHtml(roleName(state.role))} · Demo profile</p><hr><div class="profile-detail"><span>Profile status</span><strong>Prototype only</strong></div><div class="profile-detail"><span>Account created</span><strong>Local demo session</strong></div><div class="disclaimer" style="margin-top:15px;text-align:left">Do not add a real CNIC or sensitive personal details.</div></section><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Personal information</h2><p class="panel-note">${escapeHtml(title)} details stored in browser localStorage</p></div></div><div class="panel-body"><div class="profile-detail"><span>Full name</span><strong>${escapeHtml(p.name)}</strong></div><div class="profile-detail"><span>Email address</span><strong>${escapeHtml(p.email)}</strong></div><div class="profile-detail"><span>Phone number</span><strong>${escapeHtml(p.phone || "Not provided")}</strong></div><div class="profile-detail"><span>City</span><strong>${escapeHtml(p.city || "Not provided")}</strong></div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">${button("Edit profile", "edit-profile", "secondary")}${button("Reset demo data", "reset-data", "danger small")}${button("Sign out", "sign-out", "secondary small")}</div></div></section></div>`;
	}

	function renderAnalytics() {
		const all = state.data.appointments;
		const completed = all.filter((item) => item.status === "Completed").length;
		const cancelled = all.filter((item) => item.status === "Cancelled").length;
		const active = activeAppointments().length;
		const utilization = Math.min(93, Math.round(active / Math.max(1, state.data.offices.length * 3) * 100));
		return `${pageHeader("analytics")}<section class="grid metric-grid">${metric("Total sample records", String(all.length), "All local appointment records", "◷")}${metric("Active", String(active), "Confirmed and pending", "✓")}${metric("Completed", String(completed), "Sample status", "▣")}${metric("Cancelled", String(cancelled), "Sample status", "×")}</section><div class="grid dashboard-grid"><section class="panel"><div class="panel-header"><div><h2 class="panel-title">Weekly appointment activity</h2><p class="panel-note">Based on local demo appointments · illustrative only</p></div></div><div class="chart-area">${miniBars()}</div></section><section class="panel"><div class="panel-header"><h2 class="panel-title">Sample slot utilization</h2></div><div class="panel-body"><div class="risk-head"><span class="row-title">Overall illustration</span><strong>${utilization}%</strong></div><div class="progress-track" style="margin-top:10px"><div class="progress-fill" style="width:${utilization}%"></div></div><p class="row-subtitle" style="margin-top:12px">Computed from a small sample dataset and arbitrary demo capacity. Not suitable for operational planning.</p><hr style="border:0;border-top:1px solid var(--line);margin:16px 0"><div class="profile-detail"><span>Departments in demo</span><strong>${state.data.departments.length}</strong></div><div class="profile-detail"><span>Sample offices</span><strong>${state.data.offices.length}</strong></div><div class="profile-detail"><span>Users and staff</span><strong>${state.data.users.length}</strong></div></div></section></div>`;
	}

	function recommendSlots(city, date) {
		const offices = state.data.offices.filter((office) => office.active && (!city || office.city.toLowerCase() === city.toLowerCase()));
		const suitableOffices = offices.length ? offices : state.data.offices.filter((office) => office.active);
		const times = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM"];
		return suitableOffices.flatMap((office, officeIndex) => times.filter((time, index) => !state.data.appointments.some((item) => item.officeId === office.id && item.date === date && item.time === time && !["Cancelled", "Completed"].includes(item.status))).map((time, index) => ({ officeId: office.id, date, time, score: 100 - index * 3 - officeIndex * 4, utilization: 20 + (index * 13 + officeIndex * 17) % 70 }))).sort((a, b) => b.score - a.score).slice(0, 12);
	}

	function renderOptimizer() {
		const date = state.optimizerDate || addDays(2);
		const officeFilter = state.optimizerOffice || "all";
		const slots = recommendSlots("", date).filter((slot) => officeFilter === "all" || slot.officeId === officeFilter);
		const average = slots.length ? Math.round(slots.reduce((sum, item) => sum + item.utilization, 0) / slots.length) : 0;
		return `${pageHeader("optimizer")}<div class="disclaimer" style="margin-bottom:15px">All values below are generated from local fictional data using simple deterministic rules. This is not a real AI model, live capacity feed, or validated scheduling tool.</div><div class="grid dashboard-grid"><section class="panel"><div class="toolbar"><div class="toolbar-group"><label class="row-subtitle" for="optimizer-date">Date</label><input class="toolbar-select" id="optimizer-date" type="date" min="${isoDate(new Date())}" value="${escapeHtml(date)}"><select class="toolbar-select" id="optimizer-office"><option value="all">All offices</option>${state.data.offices.map((office) => `<option value="${escapeHtml(office.id)}" ${officeFilter === office.id ? "selected" : ""}>${escapeHtml(office.city)} office</option>`).join("")}</select></div></div><div class="panel-header"><div><h2 class="panel-title">Suggested available slots</h2><p class="panel-note">Ranked by earlier time and lower sample utilization</p></div></div><div class="table-wrap"><table><thead><tr><th>Suggested slot</th><th>Office</th><th>Sample use</th><th>Reason</th></tr></thead><tbody>${slots.slice(0, 8).map((item) => `<tr><td><strong>${escapeHtml(formatDate(item.date))} · ${escapeHtml(item.time)}</strong></td><td>${escapeHtml(getOffice(item.officeId).name)}</td><td><div class="progress-track" style="width:75px"><div class="progress-fill ${item.utilization > 65 ? "amber" : ""}" style="width:${item.utilization}%"></div></div><small>${item.utilization}% fictional</small></td><td>Open in sample schedule</td></tr>`).join("") || `<tr><td colspan="4">No sample slots match this filter.</td></tr>`}</tbody></table></div></section><div class="grid"><section class="panel"><div class="panel-header"><h2 class="panel-title">Utilization overview</h2></div><div class="panel-body"><div class="risk-box"><span>Average sample utilization</span><strong>${average}%</strong><div class="progress-track"><div class="progress-fill" style="width:${average}%"></div></div></div><ul class="reason-list"><li>Excluded occupied sample slots</li><li>Favors earlier times in ranking</li><li>Office filter follows citizen selection</li></ul></div></section><section class="panel"><div class="panel-header"><h2 class="panel-title">Recommendation explanation</h2></div><div class="panel-body"><p class="row-subtitle">The demo ranks available options using a predictable sample score. It does not use a citizen profile, sensitive traits, real office hours, or a trained model.</p></div></section></div></div>`;
	}

	const staffNav = [
		{ section: "Workspace", items: [["dashboard", "▦", "Dashboard"], ["schedule", "▤", "Daily schedule"], ["queue", "⇥", "Queue management"], ["appointments", "◷", "Appointments"], ["predictions", "◉", "No-show estimates"]] },
		{ section: "Account", items: [["profile", "◉", "Staff profile"]] }
	];
	const adminNav = [
		{ section: "Overview", items: [["dashboard", "▦", "Dashboard"], ["analytics", "▥", "Analytics & reports"], ["optimizer", "✳", "Slot optimizer"], ["predictions", "◉", "No-show estimates"]] },
		{ section: "Management", items: [["users", "♙", "Users & staff"], ["departments", "▤", "Departments"], ["services", "▧", "Services"], ["offices", "⌖", "Government offices"], ["appointments", "◷", "Appointments"], ["slots", "▦", "Schedule & slots"]] },
		{ section: "Configuration", items: [["notifications", "♧", "Notifications"], ["chatbot", "☏", "FAQ management"], ["activity", "≡", "Activity logs"], ["permissions", "⚿", "Roles & permissions"], ["settings", "⚙", "System settings"], ["profile", "◉", "Profile & sign out"]] }
	];
	const navForRole = () => ({ citizen: citizenNav, staff: staffNav, admin: adminNav }[state.role] || citizenNav);

	function render() {
		if (state.page === "public") {
			app.innerHTML = renderLanding();
		} else if (state.page === "auth") {
			app.innerHTML = renderAuth();
		} else {
			app.innerHTML = renderShell();
		}
		renderModal();
		renderChat();
	}

	const schemas = {
		users: { fields: [["name", "Full name", "text"], ["email", "Email", "email"], ["role", "Role", "select", ["Citizen", "Staff", "Administrator"]], ["status", "Status", "select", ["Active", "Inactive"]], ["office", "Assigned office", "text"]] },
		departments: { fields: [["name", "Department name", "text"], ["description", "Description", "textarea"], ["icon", "Department icon key", "text"]] },
		services: { fields: [["name", "Service name", "text"], ["departmentId", "Department", "department"], ["description", "Description", "textarea"], ["duration", "Typical appointment duration", "text"], ["icon", "Service icon key", "text"]] },
		offices: { fields: [["name", "Office name", "text"], ["city", "City", "text"], ["address", "Sample address", "text"]] },
		faqs: { fields: [["question", "Question", "text"], ["answer", "Answer", "textarea"]] }
	};

	function renderManagement(kind) {
		const records = state.data[kind] || [];
		const headers = { users: ["Name", "Email", "Role", "Status", "Assigned office"], departments: ["Department", "Description", "Services", "Status"], services: ["Service", "Department", "Duration", "Status"], offices: ["Office", "City", "Address", "Status"], faqs: ["Question", "Answer"] }[kind];
		const addLabel = { users: "user", departments: "department", services: "service", offices: "office", faqs: "FAQ" }[kind];
		const rows = records.map((record) => {
			let cells = "";
			if (kind === "users") {
				cells = `<td><strong>${escapeHtml(record.name)}</strong></td><td>${escapeHtml(record.email)}</td><td>${escapeHtml(record.role)}</td><td><span class="status ${record.status === "Active" ? "confirmed" : "cancelled"}">${escapeHtml(record.status)}</span></td><td>${escapeHtml(record.office || "—")}</td>`;
			} else if (kind === "departments") {
				cells = `<td><strong>${escapeHtml(record.name)}</strong></td><td>${escapeHtml(record.description)}</td><td>${state.data.services.filter((service) => service.departmentId === record.id).length}</td><td><span class="status ${record.active === false ? "cancelled" : "confirmed"}">${record.active === false ? "Inactive" : "Active"}</span></td>`;
			} else if (kind === "services") {
				cells = `<td><strong>${escapeHtml(record.name)}</strong><small style="display:block;color:var(--muted);margin-top:3px">${escapeHtml(record.description)}</small></td><td>${escapeHtml(getDepartment(record.departmentId).name)}</td><td>${escapeHtml(record.duration || "Varies by service")}</td><td><span class="status ${record.active === false ? "cancelled" : "confirmed"}">${record.active === false ? "Inactive" : "Active"}</span></td>`;
			} else if (kind === "offices") {
				cells = `<td><strong>${escapeHtml(record.name)}</strong></td><td>${escapeHtml(record.city)}</td><td>${escapeHtml(record.address)}</td><td><span class="status ${record.active === false ? "cancelled" : "confirmed"}">${record.active === false ? "Inactive" : "Active"}</span></td>`;
			} else {
				cells = `<td><strong>${escapeHtml(record.question)}</strong><small style="display:block;color:var(--muted);margin-top:3px">${escapeHtml(record.answer)}</small></td>`;
			}
			return `<tr data-searchable data-search="${escapeHtml(Object.values(record).join(" ").toLowerCase())}">${cells}<td><div class="table-actions"><button class="button secondary small" data-action="edit-record" data-kind="${kind}" data-id="${escapeHtml(record.id)}">Edit</button><button class="button danger small" data-action="delete-record" data-kind="${kind}" data-id="${escapeHtml(record.id)}">Delete</button></div></td></tr>`;
		}).join("");
		const page = kind === "faqs" ? "chatbot" : kind;
		return `${pageHeader(page, button(`＋ Add ${addLabel}`, "add-record", "", `data-kind="${kind}"`))}<section class="panel"><div class="toolbar"><div class="toolbar-group"><input class="toolbar-search" id="management-search" type="search" placeholder="Search ${escapeHtml(kind)}" aria-label="Search records"></div><span class="row-subtitle">${records.length} records · local demo data</span></div><div class="table-wrap"><table><thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}<th>Actions</th></tr></thead><tbody>${rows || `<tr><td colspan="${headers.length + 1}">No records found.</td></tr>`}</tbody></table></div></section><p class="row-subtitle" style="margin-top:11px">Changes affect only this browser’s fictional prototype data.</p>`;
	}

	function renderSlots() {
		const entries = state.data.slots;
		return `${pageHeader("slots", button("＋ Add sample slot", "add-slot"))}<section class="panel"><div class="toolbar"><div class="toolbar-group"><input class="toolbar-search" id="slot-search" type="search" placeholder="Search office or date" aria-label="Search slots"></div><span class="row-subtitle">${entries.length} configured slots</span></div><div class="table-wrap"><table><thead><tr><th>Date</th><th>Office</th><th>Time</th><th>Capacity</th><th>Status</th><th>Actions</th></tr></thead><tbody>${entries.map((slot) => `<tr data-searchable data-search="${escapeHtml((formatDate(slot.date) + " " + getOffice(slot.officeId).name + " " + slot.time).toLowerCase())}"><td><strong>${escapeHtml(formatDate(slot.date))}</strong></td><td>${escapeHtml(getOffice(slot.officeId).name)}</td><td>${escapeHtml(slot.time)}</td><td>${escapeHtml(slot.capacity)}</td><td><span class="status ${slot.active ? "confirmed" : "cancelled"}">${slot.active ? "Available" : "Closed"}</span></td><td><div class="table-actions"><button class="button secondary small" data-action="toggle-slot" data-id="${escapeHtml(slot.id)}">${slot.active ? "Close" : "Open"}</button><button class="button danger small" data-action="delete-slot" data-id="${escapeHtml(slot.id)}">Delete</button></div></td></tr>`).join("") || `<tr><td colspan="6">No slots configured. Add sample slots to populate the schedule manager.</td></tr>`}</tbody></table></div></section><p class="row-subtitle" style="margin-top:11px">Availability is local demo data; the booking wizard also shows fictional default times.</p>`;
	}

	function renderActivity() {
		return `${pageHeader("activity")}<section class="panel"><div class="panel-header"><div><h2 class="panel-title">Recent prototype actions</h2><p class="panel-note">Stored locally in this browser</p></div></div><div class="table-wrap"><table><thead><tr><th>Action</th><th>Actor</th><th>Time</th></tr></thead><tbody>${state.data.activity.map((item) => `<tr><td><strong>${escapeHtml(item.action)}</strong></td><td>${escapeHtml(item.actor)}</td><td>${escapeHtml(new Intl.DateTimeFormat("en-PK", { dateStyle: "medium", timeStyle: "short" }).format(new Date(item.date)))}</td></tr>`).join("")}</tbody></table></div></section>`;
	}

	function renderPermissions() {
		const rows = [["Citizen", "Browse services; manage own bookings; view own notifications and profile."], ["Government staff", "View sample schedules; update appointment statuses; see sample estimates."], ["Administrator", "Manage fictional users, services, offices, slots, settings, and reports."]];
		return `${pageHeader("permissions")}<div class="disclaimer" style="margin-bottom:15px">These descriptions document frontend navigation only. They are not security controls. A real system must enforce authorization on a trusted backend.</div><section class="panel"><div class="table-wrap"><table><thead><tr><th>Role</th><th>Demo capabilities</th><th>Scope</th></tr></thead><tbody>${rows.map(([role, desc]) => `<tr><td><strong>${role}</strong></td><td>${desc}</td><td><span class="status low">Prototype UI</span></td></tr>`).join("")}</tbody></table></div></section>`;
	}

	function renderSettings() {
		const s = state.data.settings;
		return `${pageHeader("settings")}<section class="panel"><div class="panel-header"><div><h2 class="panel-title">Scheduling defaults</h2><p class="panel-note">Values are used for display in this browser only.</p></div></div><div class="panel-body"><form id="settings-form" class="form-grid"><div class="field"><label for="setting-start">Office start</label><input id="setting-start" name="officeStart" type="time" value="${escapeHtml(s.officeStart)}"></div><div class="field"><label for="setting-end">Office end</label><input id="setting-end" name="officeEnd" type="time" value="${escapeHtml(s.officeEnd)}"></div><div class="field"><label for="setting-interval">Default slot interval (minutes)</label><select id="setting-interval" name="slotInterval"><option ${s.slotInterval === "15" ? "selected" : ""}>15</option><option ${s.slotInterval === "30" ? "selected" : ""}>30</option><option ${s.slotInterval === "60" ? "selected" : ""}>60</option></select></div><div class="field"><label for="setting-reminders">Reminder preference</label><select id="setting-reminders" name="reminders"><option value="true" ${s.reminders ? "selected" : ""}>Enabled in demo UI</option><option value="false" ${!s.reminders ? "selected" : ""}>Disabled</option></select><small>No email or SMS is sent.</small></div><div class="field full"><label for="setting-prediction">No-show estimate display</label><select id="setting-prediction" name="prediction"><option value="true" ${s.prediction ? "selected" : ""}>Show sample indicators</option><option value="false" ${!s.prediction ? "selected" : ""}>Hide indicators</option></select></div><div class="full">${button("Save settings", "submit-form", "", `form="settings-form"`)}</div></form></div></section>`;
	}

	function requirementsFor() {
		return ["Choose a department and service included in the finalized project scope", "Review approved service-specific information before booking", "Specific requirements are not defined in the available project documents"];
	}

	function openBooking(serviceId = "cnic", appointmentId = null) {
		const appointment = appointmentId ? state.data.appointments.find((item) => item.id === appointmentId) : null;
		state.booking = { step: appointment ? 2 : 1, serviceId: appointment?.serviceId || serviceId, officeId: appointment?.officeId || state.data.offices.find((office) => office.city === state.data.profile.city)?.id || state.data.offices[0]?.id, date: appointment?.date || addDays(2), time: appointment?.time || "", appointmentId, formError: "" };
		state.modal = { type: "booking" };
		renderModal();
	}

	function availableTimes(date, officeId) {
		const defaultTimes = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM"];
		const explicit = state.data.slots.filter((slot) => slot.date === date && slot.officeId === officeId && slot.active).map((slot) => slot.time);
		const pool = explicit.length ? explicit : defaultTimes;
		return pool.map((time, index) => ({ time, available: !state.data.appointments.some((item) => item.officeId === officeId && item.date === date && item.time === time && item.id !== state.booking?.appointmentId && !["Cancelled", "Completed"].includes(item.status)), utilization: 18 + (index * 17) % 72 }));
	}

	function bookingModal() {
		const booking = state.booking;
		if (!booking) return "";
		const service = getService(booking.serviceId);
		const department = getDepartmentForService(service);
		const office = getOffice(booking.officeId);
		const steps = ["Service & office", "Date & time", "Review"];
		const progress = steps.map((step, index) => `<span class="wizard-step ${booking.step === index + 1 ? "active" : booking.step > index + 1 ? "done" : ""}"><span class="step-number">${booking.step > index + 1 ? "✓" : index + 1}</span>${step}</span>${index < 2 ? `<span class="step-line"></span>` : ""}`).join("");
		let content = "";
		if (booking.step === 1) {
			content = `<div class="form-grid"><div class="field full"><label for="booking-service">Service</label><select id="booking-service">${state.data.services.filter((item) => item.active && state.data.departments.some((departmentItem) => departmentItem.id === item.departmentId && departmentItem.active)).map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === booking.serviceId ? "selected" : ""}>${escapeHtml(getDepartmentForService(item).name)} · ${escapeHtml(item.name)}</option>`).join("")}</select></div><div class="field full"><label for="booking-office">Government office</label><select id="booking-office">${state.data.offices.filter((item) => item.active).map((item) => `<option value="${escapeHtml(item.id)}" ${item.id === booking.officeId ? "selected" : ""}>${escapeHtml(item.name)} · ${escapeHtml(item.city)}</option>`).join("")}</select></div><div class="full"><div class="eyebrow">Before you visit</div><div class="row-subtitle">${escapeHtml(department.name)} · ${escapeHtml(service.description)}</div><ul class="reason-list">${requirementsFor(booking.serviceId).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><div class="disclaimer">Confirm detailed requirements with the relevant department. This prototype does not collect identity documents.</div></div></div>`;
		} else if (booking.step === 2) {
			const available = availableTimes(booking.date, booking.officeId);
			const recommended = recommendSlots(office.city, booking.date).find((item) => item.officeId === booking.officeId);
			content = `<div class="form-grid"><div class="field"><label for="booking-date">Appointment date</label><input id="booking-date" type="date" min="${isoDate(new Date())}" value="${escapeHtml(booking.date)}"></div><div class="field"><label>Selected office</label><input value="${escapeHtml(office.name)}" disabled></div><div class="field full"><div class="recommendation"><div class="recommendation-head"><span class="ai-label">✳ Sample recommendation</span><span class="status low">Suggested</span></div><div class="row-title">${recommended ? `${escapeHtml(recommended.time)} · ${escapeHtml(formatDate(booking.date))}` : "Choose an available slot"}</div><div class="row-subtitle">${recommended ? "Ranked earlier among open sample slots with lower illustrative utilization." : "No open suggestion for this selection."}</div><div style="margin-top:10px"><button class="button secondary small" data-action="choose-recommended" ${recommended ? `data-time="${escapeHtml(recommended.time)}"` : "disabled"}>Select suggestion</button></div></div></div><div class="field full"><label>Available times</label><div class="slot-list">${available.map((item) => `<button class="slot-option ${booking.time === item.time ? "selected" : ""} ${item.available ? "" : "unavailable"}" data-action="choose-time" data-time="${escapeHtml(item.time)}" ${item.available ? "" : "disabled"} title="${item.available ? `${item.utilization}% fictional utilization` : "Sample slot unavailable"}">${escapeHtml(item.time)}</button>`).join("") || `<span class="row-subtitle">No configured slots for this date.</span>`}</div></div><div class="full"><div class="disclaimer">AI-style suggestion is a deterministic demo rule, not live availability or a real AI model. The selected time is still your choice.</div></div></div>`;
		} else {
			content = `<div class="recommendation" style="margin-bottom:14px"><div class="recommendation-head"><span class="ai-label">Booking summary</span><span class="status confirmed">${booking.appointmentId ? "Reschedule" : "New request"}</span></div><div class="profile-detail"><span>Service</span><strong>${escapeHtml(service.name)}</strong></div><div class="profile-detail"><span>Office</span><strong>${escapeHtml(office.name)} · ${escapeHtml(office.city)}</strong></div><div class="profile-detail"><span>Date and time</span><strong>${escapeHtml(formatDate(booking.date))} · ${escapeHtml(booking.time)}</strong></div></div><div class="form-grid"><div class="field"><label for="booking-name">Citizen name</label><input id="booking-name" value="${escapeHtml(state.data.profile.name)}" required minlength="2"></div><div class="field"><label for="booking-email">Email</label><input id="booking-email" type="email" value="${escapeHtml(state.data.profile.email)}" required></div></div><p class="row-subtitle" style="margin-top:12px">No CNIC or payment information is collected. Booking is saved locally as a prototype record.</p>`;
		}
		return `<div class="modal-backdrop" data-action="close-modal-backdrop"><section class="modal wide" role="dialog" aria-modal="true" aria-labelledby="booking-title"><header class="modal-header"><div><h2 id="booking-title">${booking.appointmentId ? "Reschedule appointment" : "Book an appointment"}</h2><p>Step ${booking.step} of 3 · No government system is contacted</p></div><button class="modal-close" data-action="close-modal" aria-label="Close dialog">×</button></header><div class="modal-body"><div class="wizard-steps">${progress}</div>${booking.formError ? `<div class="toast error" role="alert" style="margin-bottom:12px">${escapeHtml(booking.formError)}</div>` : ""}${content}</div><footer class="modal-footer"><span class="row-subtitle">Fictional sample data only</span><div class="modal-footer-right">${booking.step > 1 ? `<button class="button secondary" data-action="booking-back">Back</button>` : `<button class="button secondary" data-action="close-modal">Cancel</button>`}${button(booking.step < 3 ? "Continue →" : booking.appointmentId ? "Save new time" : "Confirm booking", booking.step < 3 ? "booking-next" : "booking-confirm")}</div></footer></section></div>`;
	}

	function renderRecordField(field, record) {
		const [name, label, type, choices = []] = field;
		const controlId = `record-${name}`;
		if (type === "select" || type === "department") {
			const options = type === "department" ? state.data.departments.map((department) => [department.id, department.name]) : choices.map((choice) => [choice, choice]);
			return `<div class="field"><label for="${controlId}">${escapeHtml(label)}</label><select id="${controlId}" name="${name}" required>${options.map(([value, optionLabel]) => `<option value="${escapeHtml(value)}" ${String(record[name] || options[0]?.[0]) === value ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("")}</select></div>`;
		}
		if (type === "textarea") return `<div class="field full"><label for="${controlId}">${escapeHtml(label)}</label><textarea id="${controlId}" name="${name}" required>${escapeHtml(record[name] || "")}</textarea></div>`;
		return `<div class="field"><label for="${controlId}">${escapeHtml(label)}</label><input id="${controlId}" name="${name}" type="${type}" value="${escapeHtml(record[name] || "")}" required></div>`;
	}

	function renderModal() {
		if (!state.modal) {
			modalRoot.innerHTML = "";
			return;
		}
		if (state.modal.type === "booking") {
			modalRoot.innerHTML = bookingModal();
			return;
		}
		const { type, kind, id } = state.modal;
		if (type === "record-form") {
			const schema = schemas[kind];
			const records = state.data[kind];
			const record = id ? records.find((item) => item.id === id) || {} : {};
			modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="record-title"><header class="modal-header"><div><h2 id="record-title">${id ? "Edit" : "Add"} ${escapeHtml(kind === "faqs" ? "FAQ entry" : kind.slice(0, -1))}</h2><p>Changes are saved to this browser only.</p></div><button class="modal-close" data-action="close-modal">×</button></header><form id="record-form" data-kind="${kind}" data-id="${escapeHtml(id || "")}"><div class="modal-body"><div class="form-grid">${schema.fields.map((field) => renderRecordField(field, record)).join("")}</div></div><footer class="modal-footer"><span class="row-subtitle">Fictional records</span><div class="modal-footer-right"><button class="button secondary" type="button" data-action="close-modal">Cancel</button><button class="button" type="submit">Save record</button></div></footer></form></section></div>`;
			return;
		}
		if (type === "slot-form") {
			modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal-backdrop"><section class="modal" role="dialog" aria-modal="true"><header class="modal-header"><div><h2>Add sample slot</h2><p>Create a fictional slot for the booking wizard.</p></div><button class="modal-close" data-action="close-modal">×</button></header><form id="slot-form"><div class="modal-body"><div class="form-grid"><div class="field full"><label for="slot-office">Office</label><select name="officeId" id="slot-office">${state.data.offices.map((office) => `<option value="${escapeHtml(office.id)}">${escapeHtml(office.name)}</option>`).join("")}</select></div><div class="field"><label for="slot-date">Date</label><input name="date" id="slot-date" type="date" min="${isoDate(new Date())}" value="${addDays(1)}" required></div><div class="field"><label for="slot-time">Time</label><input name="time" id="slot-time" type="time" value="09:00" required></div><div class="field full"><label for="slot-capacity">Capacity</label><input name="capacity" id="slot-capacity" type="number" min="1" max="20" value="1" required></div></div></div><footer class="modal-footer"><span class="row-subtitle">Local prototype data</span><div class="modal-footer-right"><button class="button secondary" type="button" data-action="close-modal">Cancel</button><button class="button" type="submit">Add slot</button></div></footer></form></section></div>`;
			return;
		}
		if (type === "profile-form") {
			const profile = state.data.profile;
			modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal-backdrop"><section class="modal" role="dialog" aria-modal="true"><header class="modal-header"><div><h2>Edit demo profile</h2><p>Do not enter real private information.</p></div><button class="modal-close" data-action="close-modal">×</button></header><form id="profile-form"><div class="modal-body"><div class="form-grid"><div class="field"><label for="profile-name">Name</label><input id="profile-name" name="name" value="${escapeHtml(profile.name)}" required minlength="2"></div><div class="field"><label for="profile-email">Email</label><input id="profile-email" name="email" type="email" value="${escapeHtml(profile.email)}" required></div><div class="field"><label for="profile-phone">Phone (fictional)</label><input id="profile-phone" name="phone" value="${escapeHtml(profile.phone || "")}" placeholder="0300 000 0000"></div><div class="field"><label for="profile-city">City</label><select id="profile-city" name="city">${["Lahore", "Islamabad", "Karachi", "Peshawar", "Other"].map((city) => `<option ${profile.city === city ? "selected" : ""}>${city}</option>`).join("")}</select></div></div></div><footer class="modal-footer"><span class="row-subtitle">Saved in localStorage</span><div class="modal-footer-right"><button class="button secondary" type="button" data-action="close-modal">Cancel</button><button class="button" type="submit">Save profile</button></div></footer></form></section></div>`;
			return;
		}
		if (type === "notification-form") {
			modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal-backdrop"><section class="modal" role="dialog" aria-modal="true"><header class="modal-header"><div><h2>Create sample notification</h2><p>Displayed locally in this prototype. No message is sent.</p></div><button class="modal-close" data-action="close-modal">×</button></header><form id="notification-form"><div class="modal-body"><div class="form-grid"><div class="field full"><label for="notification-title">Title</label><input id="notification-title" name="title" required maxlength="70" placeholder="Service update"></div><div class="field full"><label for="notification-body">Message</label><textarea id="notification-body" name="body" required maxlength="300" placeholder="Write a short demo update"></textarea></div></div></div><footer class="modal-footer"><span class="row-subtitle">Fictional local notice</span><div class="modal-footer-right"><button class="button secondary" type="button" data-action="close-modal">Cancel</button><button class="button" type="submit">Create notification</button></div></footer></form></section></div>`;
			return;
		}
		if (type === "qr-token") {
			const item = state.data.appointments.find((appointment) => appointment.id === id);
			if (!item) { state.modal = null; renderModal(); return; }
			const token = `AI E-MULAKAT ${item.id}`;
			const qr = qrCodeSvg(token);
			modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal-backdrop"><section class="modal qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title"><header class="modal-header"><div><h2 id="qr-title">Appointment QR token</h2><p>Scan the reference token for this local demo appointment.</p></div><button class="modal-close" data-action="close-modal" aria-label="Close dialog">×</button></header><div class="modal-body qr-body"><div class="qr-frame">${qr}</div><div class="qr-reference"><span class="eyebrow">Appointment reference</span><strong>${escapeHtml(item.id)}</strong><span class="row-subtitle">QR contains this reference only; no personal information.</span></div></div><footer class="modal-footer"><button class="button secondary" data-action="appointment-detail" data-id="${escapeHtml(item.id)}">Back to details</button><a class="button" href="data:image/svg+xml;charset=utf-8,${encodeURIComponent(qr)}" download="${escapeHtml(item.id)}-qr-token.svg">Download QR</a></footer></section></div>`;
			return;
		}
		if (type === "appointment-detail") {
			const item = state.data.appointments.find((appointment) => appointment.id === id);
			if (!item) { state.modal = null; renderModal(); return; }
			const citizenMode = state.role === "citizen";
			const actions = citizenMode ? `<button class="button secondary" data-action="reschedule" data-id="${escapeHtml(item.id)}" ${["Cancelled", "Completed"].includes(item.status) ? "disabled" : ""}>Reschedule</button><button class="button danger" data-action="cancel-appointment" data-id="${escapeHtml(item.id)}" ${["Cancelled", "Completed"].includes(item.status) ? "disabled" : ""}>Cancel appointment</button>` : `<select class="toolbar-select" id="status-update" data-id="${escapeHtml(item.id)}">${["Pending", "Confirmed", "Checked in", "In service", "Completed", "Cancelled", "No-show"].map((status) => `<option ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}</select><button class="button" data-action="update-status" data-id="${escapeHtml(item.id)}">Update status</button>`;
			const service = getService(item.serviceId);
			const department = getDepartmentForService(service);
			modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal-backdrop"><section class="modal" role="dialog" aria-modal="true"><header class="modal-header"><div><h2>Appointment details</h2><p>Reference ${escapeHtml(item.id)} · Fictional appointment</p></div><button class="modal-close" data-action="close-modal">×</button></header><div class="modal-body"><div class="recommendation"><div class="recommendation-head"><span class="ai-label">${escapeHtml(department.name)} · ${escapeHtml(service.name)}</span><span class="status ${statusClass(item.status)}">${escapeHtml(item.status)}</span></div><div class="profile-detail"><span>Appointment date and time</span><strong>${escapeHtml(formatDate(item.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" }))} · ${escapeHtml(item.time)}</strong></div><div class="profile-detail"><span>Office</span><strong>${escapeHtml(getOffice(item.officeId).name)} · ${escapeHtml(getOffice(item.officeId).city)}</strong></div><div class="profile-detail"><span>Citizen</span><strong>${escapeHtml(item.citizen)}</strong></div><div class="profile-detail"><span>Email</span><strong>${escapeHtml(item.email || "Not provided")}</strong></div></div><div class="token-row"><div><span class="row-subtitle">Appointment token</span><strong>${escapeHtml(item.id)}</strong></div><button class="button secondary small" data-action="show-qr-token" data-id="${escapeHtml(item.id)}">View QR token</button></div><p class="disclaimer" style="margin-top:13px">Appointment records are saved locally. This is not a confirmed booking with a government office.</p></div><footer class="modal-footer"><button class="button secondary" data-action="close-modal">Close</button><div class="modal-footer-right">${actions}</div></footer></section></div>`;
			return;
		}
		if (type === "service-detail") {
			const service = getService(id);
			const department = getDepartmentForService(service);
			modalRoot.innerHTML = `<div class="modal-backdrop" data-action="close-modal-backdrop"><section class="modal" role="dialog" aria-modal="true"><header class="modal-header"><div><h2>${escapeHtml(service.name)}</h2><p>${escapeHtml(department.name)} · ${escapeHtml(service.duration || "Varies by service")}</p></div><button class="modal-close" data-action="close-modal">×</button></header><div class="modal-body"><p class="page-description">${escapeHtml(service.description)}</p><h3 class="panel-title" style="margin:20px 0 10px">Before booking</h3><ul class="reason-list">${requirementsFor(id).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul><div class="disclaimer">Detailed requirements are not part of this demo. Confirm current information with the relevant department.</div></div><footer class="modal-footer"><button class="button secondary" data-action="close-modal">Close</button>${state.role === "citizen" ? button("Book this service", "book-service", "", `data-id="${escapeHtml(id)}"`) : ""}</footer></section></div>`;
		}
	}

	function renderChat() {
		if (state.page === "public" || state.page === "auth") return;
		const existing = document.querySelector(".chat-window");
		if (existing) existing.remove();
		if (state.chatOpen) document.querySelector(".app-shell")?.insertAdjacentHTML("beforeend", renderChatWindow());
	}
	function renderChatWindow() {
		return `<section class="chat-window" role="dialog" aria-label="Prototype FAQ assistant"><header class="chat-header"><div><strong>AI E-Mulakat guide</strong><small>Sample FAQ assistant · Not real AI</small></div><button class="modal-close" data-action="toggle-chat" aria-label="Close assistant">×</button></header><div class="chat-messages" id="chat-messages"><div class="chat-message">Hello! I can help with sample service requirements, booking steps, or appointment changes. What would you like to know?</div></div><div class="suggested-questions">${["What should I bring?", "How do I reschedule?", "Is this official?"].map((question) => `<button class="suggested-question" data-action="ask-question" data-question="${escapeHtml(question)}">${escapeHtml(question)}</button>`).join("")}</div><form class="chat-form" id="chat-form"><input name="message" placeholder="Ask a question…" aria-label="Type a question" required><button type="submit" aria-label="Send message">➤</button></form></section>`;
	}

	function answerQuestion(message) {
		const query = message.toLowerCase();
		if (/official|government website|real website|affiliat/.test(query)) return state.data.faqs.find((item) => /official government/.test(item.answer))?.answer || "This is an academic prototype, not an official government website.";
		if (/reschedul|change|cancel/.test(query)) return state.data.faqs.find((item) => /change my appointment/.test(item.question))?.answer || "Open My appointments, select a booking, and choose Reschedule or Cancel.";
		if (/recommend|optimizer|ai|slot|time/.test(query)) return state.data.faqs.find((item) => /recommendations work/.test(item.question))?.answer || "The recommendation is a sample rule-based suggestion, not a real AI service.";
		if (/bring|document|requirement|paper/.test(query)) return state.data.faqs.find((item) => /bring to my appointment/.test(item.question))?.answer || "Requirements vary. Review a service’s sample checklist and confirm details through official channels.";
		if (/book|appointment|service/.test(query)) return "Browse Services, select a sample service, choose an office, date, and available time, then review the booking. Records are saved only in this browser.";
		return "I can answer basic questions about sample services, required documents, appointment booking, rescheduling, recommendations, and prototype status. Try asking about one of those topics.";
	}

	function appendChatMessage(message, isUser) {
		const messages = document.getElementById("chat-messages");
		if (!messages) return;
		const node = document.createElement("div");
		node.className = `chat-message ${isUser ? "user" : ""}`;
		node.textContent = message;
		messages.append(node);
		messages.scrollTop = messages.scrollHeight;
	}

	function navigate(page) {
		if (!page) return;
		state.page = page;
		state.search = "";
		state.mobileMenu = false;
		state.modal = null;
		render();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function createNotification(title, body) {
		state.data.notifications.unshift({ id: `N-${Date.now()}`, title, body, date: new Date().toISOString(), read: false });
		saveData();
	}

	function confirmBooking() {
		const booking = state.booking;
		const name = document.getElementById("booking-name")?.value.trim();
		const email = document.getElementById("booking-email")?.value.trim();
		if (!name || name.length < 2) { booking.formError = "Enter a name with at least two characters."; renderModal(); return; }
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "")) { booking.formError = "Enter a valid email address."; renderModal(); return; }
		if (!booking.date || !booking.time || !booking.officeId) { booking.formError = "Choose an office, date, and available time."; renderModal(); return; }
		const stillAvailable = availableTimes(booking.date, booking.officeId).some((item) => item.time === booking.time && item.available);
		if (!stillAvailable) { booking.formError = "That sample slot is no longer available. Choose another time."; booking.step = 2; renderModal(); return; }
		const appointment = booking.appointmentId ? state.data.appointments.find((item) => item.id === booking.appointmentId) : null;
		if (appointment) {
			appointment.date = booking.date;
			appointment.time = booking.time;
			appointment.officeId = booking.officeId;
			appointment.status = "Confirmed";
			appointment.risk = "Low";
			addActivity(`Appointment ${appointment.id} rescheduled in prototype`);
			createNotification("Appointment rescheduled", `Appointment ${appointment.id} has a new sample time: ${formatDate(appointment.date)} at ${appointment.time}.`);
			state.modal = null;
			saveData();
			render();
			toast("Sample appointment rescheduled.");
			return;
		}
		const id = `EM-${String(Date.now()).slice(-6)}`;
		const risk = booking.time.startsWith("09") || booking.time.startsWith("10") ? "Low" : "Medium";
		state.data.appointments.unshift({ id, serviceId: booking.serviceId, officeId: booking.officeId, date: booking.date, time: booking.time, status: "Pending", citizen: name, email, risk, createdAt: new Date().toISOString() });
		state.data.profile.name = name;
		state.data.profile.email = email;
		addActivity(`Appointment ${id} created in prototype`);
		createNotification("Appointment request saved", `Your sample appointment ${id} is saved locally for ${formatDate(booking.date)} at ${booking.time}.`);
		state.modal = { type: "appointment-detail", id };
		state.booking = null;
		state.page = "appointments";
		saveData();
		render();
		toast(`Appointment request saved. Reference ${id}.`);
	}

	function statusUpdate(id, status) {
		const item = state.data.appointments.find((appointment) => appointment.id === id);
		if (!item) return;
		item.status = status;
		addActivity(`Appointment ${id} status updated to ${status}`);
		createNotification("Appointment status updated", `Sample appointment ${id} is now marked ${status}.`);
		saveData();
		state.modal = null;
		render();
		toast(`Sample status updated to ${status}.`);
	}

	function updateQueueStatus(id, status) {
		const item = state.data.appointments.find((appointment) => appointment.id === id);
		if (!item) return;
		if (status === "In service" && state.data.appointments.some((appointment) => appointment.date === item.date && appointment.status === "In service" && appointment.id !== item.id)) {
			toast("Complete the current appointment before calling another citizen.", "info");
			return;
		}
		item.status = status;
		addActivity(`Queue appointment ${id} updated to ${status}`);
		createNotification("Queue status updated", `Appointment ${id} is now marked ${status} in the local demo queue.`);
		saveData();
		render();
		toast(`Queue updated: ${status}.`);
	}

	function openRecordForm(kind, id = null) {
		state.modal = { type: "record-form", kind, id };
		renderModal();
	}
	function deleteRecord(kind, id) {
		const record = state.data[kind].find((item) => item.id === id);
		if (!record || !window.confirm(`Delete “${record.name || record.question}” from this browser's sample data?`)) return;
		if (kind === "departments" && state.data.services.some((service) => service.departmentId === id)) {
			toast("Reassign or remove this department’s services before deleting it.", "error");
			return;
		}
		if (kind === "services" && state.data.appointments.some((appointment) => appointment.serviceId === id)) {
			toast("This service has appointment records. Keep it available for their history.", "error");
			return;
		}
		state.data[kind] = state.data[kind].filter((item) => item.id !== id);
		addActivity(`Deleted ${kind} record ${id}`);
		saveData();
		render();
		toast("Sample record deleted.");
	}

	function onClick(event) {
		const target = event.target.closest("[data-action]");
		if (!target) return;
		const action = target.dataset.action;
		if (action === "close-modal-backdrop" && event.target !== target) return;
		const id = target.dataset.id;
		switch (action) {
			case "home": state.page = "public"; state.modal = null; state.chatOpen = false; render(); break;
			case "open-auth": state.page = "auth"; state.authMode = "login"; render(); break;
			case "enter-demo": state.data.loggedIn = true; state.role = "citizen"; navigate("dashboard"); toast("Citizen demo portal opened.", "info"); break;
			case "auth-mode": state.authMode = target.dataset.value; render(); break;
			case "go-page": navigate(target.dataset.page); break;
			case "toggle-menu": state.mobileMenu = !state.mobileMenu; render(); break;
			case "toggle-chat": state.chatOpen = !state.chatOpen; renderChat(); break;
			case "start-booking": openBooking(); break;
			case "service-details": state.modal = { type: "service-detail", id }; renderModal(); break;
			case "book-service": state.modal = null; openBooking(id); break;
			case "close-modal": state.modal = null; renderModal(); break;
			case "close-modal-backdrop": state.modal = null; renderModal(); break;
			case "booking-back": state.booking.step = Math.max(1, state.booking.step - 1); state.booking.formError = ""; renderModal(); break;
			case "booking-next": {
				if (state.booking.step === 1 && (!state.booking.officeId || !state.booking.serviceId)) { state.booking.formError = "Choose a service and office to continue."; renderModal(); break; }
				if (state.booking.step === 2 && !state.booking.time) { state.booking.formError = "Choose one available appointment time."; renderModal(); break; }
				state.booking.formError = "";
				state.booking.step += 1;
				renderModal();
				break;
			}
			case "choose-time": state.booking.time = target.dataset.time; state.booking.formError = ""; renderModal(); break;
			case "choose-recommended": state.booking.time = target.dataset.time; state.booking.formError = ""; renderModal(); break;
			case "booking-confirm": confirmBooking(); break;
			case "appointment-detail": state.modal = { type: "appointment-detail", id }; renderModal(); break;
			case "show-qr-token": state.modal = { type: "qr-token", id }; renderModal(); break;
			case "queue-check-in": updateQueueStatus(id, "Checked in"); break;
			case "queue-call": updateQueueStatus(id, "In service"); break;
			case "queue-status": updateQueueStatus(id, target.dataset.status); break;
			case "reschedule": state.modal = null; openBooking("identity", id); break;
			case "cancel-appointment": {
				const appointment = state.data.appointments.find((item) => item.id === id);
				if (!appointment || !window.confirm("Cancel this fictional appointment in the local prototype?")) break;
				appointment.status = "Cancelled";
				addActivity(`Appointment ${id} cancelled in prototype`);
				createNotification("Appointment cancelled", `Sample appointment ${id} has been cancelled locally.`);
				saveData(); state.modal = null; render(); toast("Sample appointment cancelled."); break;
			}
			case "update-status": statusUpdate(id, document.getElementById("status-update")?.value || "Pending"); break;
			case "edit-profile": state.modal = { type: "profile-form" }; renderModal(); break;
			case "create-notification": state.modal = { type: "notification-form" }; renderModal(); break;
			case "add-record": openRecordForm(target.dataset.kind); break;
			case "edit-record": openRecordForm(target.dataset.kind, id); break;
			case "delete-record": deleteRecord(target.dataset.kind, id); break;
			case "add-slot": state.modal = { type: "slot-form" }; renderModal(); break;
			case "toggle-slot": {
				const slot = state.data.slots.find((item) => item.id === id);
				if (slot) { slot.active = !slot.active; addActivity(`Slot ${id} ${slot.active ? "opened" : "closed"}`); saveData(); render(); toast(`Sample slot ${slot.active ? "opened" : "closed"}.`); }
				break;
			}
			case "delete-slot":
				if (window.confirm("Delete this sample slot?")) { state.data.slots = state.data.slots.filter((item) => item.id !== id); addActivity(`Slot ${id} deleted`); saveData(); render(); toast("Sample slot deleted."); }
				break;
			case "mark-read": {
				const note = state.data.notifications.find((item) => item.id === id);
				if (note) note.read = true;
				saveData(); render(); break;
			}
			case "mark-all-read": state.data.notifications.forEach((item) => { item.read = true; }); saveData(); render(); toast("Notifications marked as read."); break;
			case "reset-data":
				if (window.confirm("Reset all local prototype records to the original fictional sample data?")) { localStorage.removeItem(STORAGE_KEY); state.data = initialData(); state.role = "citizen"; state.modal = null; state.page = "dashboard"; render(); toast("Prototype data reset.", "info"); }
				break;
			case "sign-out": state.data.loggedIn = false; saveData(); state.role = "citizen"; state.page = "public"; state.modal = null; state.chatOpen = false; render(); break;
			case "ask-question": askChat(target.dataset.question); break;
		}
	}

	function askChat(question) {
		if (!state.chatOpen) { state.chatOpen = true; renderChat(); }
		appendChatMessage(question, true);
		window.setTimeout(() => appendChatMessage(answerQuestion(question), false), 180);
	}

	function onSubmit(event) {
		const form = event.target;
		if (!(form instanceof HTMLFormElement)) return;
		event.preventDefault();
		if (form.id === "auth-form") {
			if (!form.reportValidity()) return;
			const formData = new FormData(form);
			const role = String(formData.get("role") || "citizen");
			const email = String(formData.get("email") || "").trim();
			const register = state.authMode === "register";
			state.role = ["citizen", "staff", "admin"].includes(role) ? role : "citizen";
			state.data.profile = { ...state.data.profile, name: String(formData.get("name") || (state.role === "citizen" ? "Ayesha Khan" : state.role === "staff" ? "Sara Iqbal" : "Omar Farooq")), email, role: state.role };
			state.data.loggedIn = true;
			addActivity(`${register ? "Created" : "Opened"} ${roleName(state.role)} demo session`);
			saveData();
			navigate("dashboard");
			toast(`${roleName(state.role)} demo portal opened.`, "info");
			return;
		}
		if (form.id === "record-form") {
			if (!form.reportValidity()) return;
			const kind = form.dataset.kind;
			const id = form.dataset.id;
			const values = Object.fromEntries(new FormData(form).entries());
			const existing = id ? state.data[kind].find((item) => item.id === id) : null;
			if (existing) Object.assign(existing, values);
			else state.data[kind].unshift({ id: `${kind.slice(0, 2).toUpperCase()}-${Date.now().toString().slice(-6)}`, ...values, ...(kind === "departments" || kind === "services" || kind === "offices" ? { active: true } : {}) });
			addActivity(`${existing ? "Updated" : "Added"} ${kind} record`);
			saveData(); state.modal = null; render(); toast("Sample record saved."); return;
		}
		if (form.id === "profile-form") {
			if (!form.reportValidity()) return;
			Object.assign(state.data.profile, Object.fromEntries(new FormData(form).entries()));
			addActivity("Updated demo profile"); saveData(); state.modal = null; render(); toast("Demo profile saved."); return;
		}
		if (form.id === "notification-form") {
			if (!form.reportValidity()) return;
			const values = Object.fromEntries(new FormData(form).entries());
			createNotification(values.title.trim(), values.body.trim());
			addActivity("Created sample notification");
			saveData(); state.modal = null; render(); toast("Sample notification created."); return;
		}
		if (form.id === "slot-form") {
			if (!form.reportValidity()) return;
			const formData = new FormData(form);
			const timeRaw = String(formData.get("time"));
			const [hourRaw, minute] = timeRaw.split(":");
			const hour = Number(hourRaw);
			const time = `${String(hour % 12 || 12).padStart(2, "0")}:${minute} ${hour >= 12 ? "PM" : "AM"}`;
			state.data.slots.unshift({ id: `SL-${Date.now().toString().slice(-6)}`, officeId: String(formData.get("officeId")), date: String(formData.get("date")), time, capacity: Number(formData.get("capacity")), active: true });
			addActivity("Added sample appointment slot"); saveData(); state.modal = null; render(); toast("Sample slot added."); return;
		}
		if (form.id === "settings-form") {
			const values = Object.fromEntries(new FormData(form).entries());
			state.data.settings = { ...state.data.settings, ...values, reminders: values.reminders === "true", prediction: values.prediction === "true" };
			addActivity("Updated prototype settings"); saveData(); render(); toast("Prototype settings saved."); return;
		}
		if (form.id === "chat-form") {
			const input = form.elements.message;
			const message = String(input.value || "").trim();
			if (!message) return;
			input.value = "";
			appendChatMessage(message, true);
			window.setTimeout(() => appendChatMessage(answerQuestion(message), false), 180);
		}
	}

	function updateSearch(value, selector = "[data-searchable]") {
		const query = String(value || "").trim().toLowerCase();
		document.querySelectorAll(selector).forEach((item) => {
			const content = item.dataset.search || item.textContent.toLowerCase();
			item.classList.toggle("hidden", Boolean(query) && !content.includes(query));
		});
	}

	document.addEventListener("click", onClick);
	document.addEventListener("submit", onSubmit);
	document.addEventListener("change", (event) => {
		const target = event.target;
		if (target.id === "role-select") {
			state.role = target.value;
			state.page = "dashboard";
			state.search = "";
			render();
			toast(`${roleName(state.role)} demo portal opened.`, "info");
		} else if (target.id === "appointment-filter") {
			state.appointmentFilter = target.value;
			render();
		} else if (target.id === "booking-service") {
			state.booking.serviceId = target.value; state.booking.formError = ""; renderModal();
		} else if (target.id === "booking-office") {
			state.booking.officeId = target.value; state.booking.time = ""; state.booking.formError = ""; renderModal();
		} else if (target.id === "booking-date") {
			state.booking.date = target.value; state.booking.time = ""; state.booking.formError = ""; renderModal();
		} else if (target.id === "service-category") {
			document.querySelectorAll("[data-service-card]").forEach((card) => card.classList.toggle("hidden", target.value !== "all" && card.dataset.category !== target.value));
		} else if (target.id === "schedule-date") {
			state.scheduleDate = target.value; render();
		} else if (target.id === "queue-date") {
			state.queueDate = target.value; render();
		} else if (target.id === "optimizer-date") {
			state.optimizerDate = target.value; render();
		} else if (target.id === "optimizer-office") {
			state.optimizerOffice = target.value; render();
		}
	});
	document.addEventListener("input", (event) => {
		const target = event.target;
		if (target.id === "global-search") { state.search = target.value; updateSearch(target.value); }
		if (target.id === "appointment-search" || target.id === "management-search" || target.id === "slot-search") updateSearch(target.value);
		if (target.id === "service-search") updateSearch(target.value, "[data-service-card]");
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && state.modal) { state.modal = null; renderModal(); }
		if (event.key === "Escape" && state.chatOpen) { state.chatOpen = false; renderChat(); }
	});

	if (state.data.loggedIn) {
		state.role = state.data.profile.role || "citizen";
		state.page = "dashboard";
	}
	render();
})();
