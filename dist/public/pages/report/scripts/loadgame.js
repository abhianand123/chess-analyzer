"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const gamesPeriod = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1
};
function padMonth(month) {
    let monthString = month.toString();
    return monthString.length > 1 ? monthString : "0" + monthString;
}
function updateGamesPeriod() {
    $("#game-select-period").html(`${padMonth(gamesPeriod.month)}/${gamesPeriod.year}`);
}
function getPlayersString(game) {
    if (game.white.aiLevel) {
        return `AI level ${game.white.aiLevel} vs. ${game.black.username} (${game.black.rating})`;
    }
    else if (game.black.aiLevel) {
        return `${game.white.username} (${game.white.rating}) vs. AI level ${game.black.aiLevel}`;
    }
    else {
        return `${game.white.username} (${game.white.rating}) vs. ${game.black.username} (${game.black.rating})`;
    }
}
function generateGameListing(game) {
    let listingContainer = $("<div>");
    listingContainer.addClass("game-listing");
    listingContainer.attr("data-pgn", game.pgn);
    listingContainer.on("click", () => {
        const pgnData = listingContainer.attr("data-pgn") || "";
        $("#pgn").val(pgnData);
        $("#review-button").removeClass("review-button-disabled");
        $("#pgn").css("display", "block");
        $("#gameInputContainer").css("display", "block");
        setTimeout(() => {
            if (typeof showCopyBtn === 'function') {
                showCopyBtn();
            }
        }, 100);
        closeModal();
    });
    let timeClass = $("<b>");
    timeClass.html(game.timeClass.replace(/^./, game.timeClass.charAt(0).toUpperCase()));
    let players = $("<span>");
    players.html(getPlayersString(game));
    listingContainer.append(timeClass);
    listingContainer.append(players);
    return listingContainer;
}
function fetchChessComGames(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        if (gamesPeriod.year > currentYear || (gamesPeriod.year === currentYear && gamesPeriod.month > currentMonth)) {
            $("#games-list").html("Cannot fetch games from future dates.");
            return;
        }
        try {
            let gamesResponse = yield fetch(`https://api.chess.com/pub/player/${username}/games/${gamesPeriod.year}/${padMonth(gamesPeriod.month)}`, { method: "GET" });
            if (!gamesResponse.ok) {
                if (gamesResponse.status === 404) {
                    $("#games-list").html("No games found for this month.");
                }
                else {
                    $("#games-list").html(`Error: ${gamesResponse.status} ${gamesResponse.statusText}`);
                }
                return;
            }
            let responseData = yield gamesResponse.json();
            if (!responseData.games || !Array.isArray(responseData.games)) {
                $("#games-list").html("No games found.");
                return;
            }
            let games = responseData.games;
            $("#games-list").html(games.length == 0 ? "No games found." : "");
            for (let game of games.reverse()) {
                let gameListing = generateGameListing({
                    white: {
                        username: game.white.username,
                        rating: game.white.rating.toString()
                    },
                    black: {
                        username: game.black.username,
                        rating: game.black.rating.toString()
                    },
                    timeClass: game["time_class"],
                    pgn: game.pgn
                });
                $("#games-list").append(gameListing);
            }
        }
        catch (error) {
            console.error("Error fetching Chess.com games:", error);
            $("#games-list").html("Failed to fetch games. Please check your internet connection and try again.");
        }
    });
}
function fetchLichessGames(username) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        if (gamesPeriod.year > currentYear || (gamesPeriod.year === currentYear && gamesPeriod.month > currentMonth)) {
            $("#games-list").html("Cannot fetch games from future dates.");
            return;
        }
        let monthBeginning = new Date(`${gamesPeriod.year}-${padMonth(gamesPeriod.month)}-01T00:00:00Z`).getTime();
        let monthLength = monthLengths[gamesPeriod.month - 1];
        if (gamesPeriod.month - 1 == 2 && gamesPeriod.year % 4 == 0) {
            monthLength = 29;
        }
        let monthEnding = new Date(`${gamesPeriod.year}-${padMonth(gamesPeriod.month)}-${monthLength}T23:59:59Z`).getTime();
        try {
            let gamesResponse = yield fetch(`https://lichess.org/api/games/user/${username}?since=${monthBeginning}&until=${monthEnding}&pgnInJson=true`, {
                method: "GET",
                headers: {
                    "Accept": "application/x-ndjson"
                }
            });
            if (!gamesResponse.ok) {
                if (gamesResponse.status === 404) {
                    $("#games-list").html("User not found or no games for this month.");
                }
                else if (gamesResponse.status === 429) {
                    $("#games-list").html("Rate limit exceeded. Please wait a moment and try again.");
                }
                else {
                    $("#games-list").html(`Error: ${gamesResponse.status} ${gamesResponse.statusText}`);
                }
                return;
            }
            let gamesNdJson = yield gamesResponse.text();
            if (!gamesNdJson || gamesNdJson.trim().length === 0) {
                $("#games-list").html("No games found.");
                return;
            }
            let games = gamesNdJson
                .split("\n")
                .filter(game => game.length > 0)
                .map(game => {
                try {
                    return JSON.parse(game);
                }
                catch (e) {
                    return null;
                }
            })
                .filter(game => game !== null);
            $("#games-list").html(games.length == 0 ? "No games found." : "");
            for (let game of games) {
                let gameListing = generateGameListing({
                    white: {
                        username: ((_a = game.players.white.user) === null || _a === void 0 ? void 0 : _a.name) || "Anonymous",
                        rating: game.players.white.rating || "?",
                        aiLevel: game.players.white.aiLevel
                    },
                    black: {
                        username: ((_b = game.players.black.user) === null || _b === void 0 ? void 0 : _b.name) || "Anonymous",
                        rating: game.players.black.rating || "?",
                        aiLevel: game.players.black.aiLevel
                    },
                    timeClass: game.speed || "Unknown",
                    pgn: game.pgn || ""
                });
                $("#games-list").append(gameListing);
            }
        }
        catch (error) {
            console.error("Error fetching Lichess games:", error);
            if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
                $("#games-list").html("Connection failed. Please check your internet connection and try again.");
            }
            else {
                $("#games-list").html("Failed to fetch games. Please try again.");
            }
        }
    });
}
function fetchGames(username) {
    let selectedLoadType = $("#load-type-dropdown").val();
    if (selectedLoadType == "chesscom") {
        fetchChessComGames(username);
    }
    else if (selectedLoadType == "lichess") {
        fetchLichessGames(username);
    }
}
function closeModal() {
    $("#game-select-menu-container").css("display", "none");
    let today = new Date();
    gamesPeriod.year = today.getFullYear();
    gamesPeriod.month = today.getMonth() + 1;
    updateGamesPeriod();
}
function registerModalEvents() {
    $("#game-select-cancel-button").on("click", closeModal);
    $("#last-page-button").on("click", () => {
        gamesPeriod.month--;
        if (gamesPeriod.month < 1) {
            gamesPeriod.month = 12;
            gamesPeriod.year--;
        }
        let username = $("#chess-site-username").val().toString();
        fetchGames(username);
        updateGamesPeriod();
    });
    $("#next-page-button").on("click", () => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        if (gamesPeriod.year > currentYear || (gamesPeriod.year === currentYear && gamesPeriod.month >= currentMonth)) {
            return;
        }
        gamesPeriod.month++;
        if (gamesPeriod.month > 12) {
            gamesPeriod.month = 1;
            gamesPeriod.year++;
        }
        if (gamesPeriod.year > currentYear || (gamesPeriod.year === currentYear && gamesPeriod.month > currentMonth)) {
            gamesPeriod.year = currentYear;
            gamesPeriod.month = currentMonth;
            return;
        }
        let username = $("#chess-site-username").val().toString();
        fetchGames(username);
        updateGamesPeriod();
    });
}
function showCopyBtn() {
    const btn = $("#copy-pgn-button");
    const textarea = $("#pgn");
    if (btn.length === 0 || textarea.length === 0) {
        return;
    }
    const text = String(textarea.val() || "").trim();
    const mode = String($("#load-type-dropdown").val() || "");
    const textareaVisible = textarea.is(":visible");
    const shouldShow = text.length > 0 && textareaVisible;
    if (shouldShow) {
        btn.css("display", "flex").addClass("visible");
    }
    else {
        btn.css("display", "none").removeClass("visible");
    }
}
const loadTypeDropdown = $("#load-type-dropdown");
const usernameInput = $("#chess-site-username");
loadTypeDropdown.on("input", () => {
    const selectedLoadType = loadTypeDropdown.val();
    const savedUsernameChessCom = localStorage.getItem('chess-site-username-saved-chessCom');
    const savedUsernameLichess = localStorage.getItem('chess-site-username-saved-lichess');
    usernameInput.val((selectedLoadType === "chesscom" && savedUsernameChessCom) ||
        (selectedLoadType === "lichess" && savedUsernameLichess) || '');
    const isLong = selectedLoadType === "pgn" || selectedLoadType === "json";
    $("#pgn").css("display", isLong ? "block" : "none");
    $("#chess-site-username, #fetch-account-games-button").css("display", isLong ? "none" : "block");
    $("#review-button").toggleClass("review-button-disabled", !isLong);
    $("#gameInputContainer").css("display", isLong ? "block" : "none");
    $("#gameInputContainer2").css("display", isLong ? "none" : "block");
    const placeholderText = (selectedLoadType === "json") ? "Enter JSON..." : "Enter PGN...";
    $("#pgn").attr("placeholder", placeholderText);
    setTimeout(() => {
        if (typeof showCopyBtn === 'function') {
            showCopyBtn();
        }
    }, 50);
});
function onFetchButtonClick() {
    $("#games-list").html("Fetching games...");
    $("#game-select-menu-container").css("display", "flex");
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    if (gamesPeriod.year > currentYear || (gamesPeriod.year === currentYear && gamesPeriod.month > currentMonth)) {
        gamesPeriod.year = currentYear;
        gamesPeriod.month = currentMonth;
    }
    updateGamesPeriod();
    const username = usernameInput.val().toString();
    const selectedLoadType = loadTypeDropdown.val();
    if (selectedLoadType === "chesscom") {
        localStorage.setItem('chess-site-username-saved-chessCom', username);
    }
    else if (selectedLoadType === "lichess") {
        localStorage.setItem('chess-site-username-saved-lichess', username);
    }
    fetchGames(username);
}
$("#fetch-account-games-button").on("click", onFetchButtonClick);
$("#chess-site-username").on("keydown", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        onFetchButtonClick();
    }
});
$("#game-select-menu-container").load("/static/pages/report/gameselect.html", registerModalEvents);
$(document).on("click", "#copy-pgn-button", function () {
    var _a, _b;
    const text = ((_a = $("#pgn").val()) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    if (text.trim()) {
        (_b = navigator.clipboard) === null || _b === void 0 ? void 0 : _b.writeText(text).then(() => {
            $(this).find("i").removeClass("fa-copy").addClass("fa-check");
            setTimeout(() => $(this).find("i").removeClass("fa-check").addClass("fa-copy"), 2000);
        }).catch(() => {
            $("#pgn").select();
            document.execCommand("copy");
        });
    }
});
$(document).ready(function () {
    showCopyBtn();
    setTimeout(showCopyBtn, 100);
    setTimeout(showCopyBtn, 500);
    setTimeout(showCopyBtn, 1000);
});
$("#pgn").on("input keyup paste change", function () {
    setTimeout(showCopyBtn, 10);
});
$("#load-type-dropdown").on("change input", function () {
    setTimeout(showCopyBtn, 10);
});
setInterval(showCopyBtn, 1000);
