#include <iostream>
#include <cstdlib>
#include <ctime>
#include <string>
#include <limits>

using namespace std;

class TreasureHuntGame {
private:
    int secretNumber;
    int attempts;
    int maxAttempts;
    int score;
    int level;
    string playerName;

public:
    TreasureHuntGame() {
        attempts = 0;
        score = 0;
        level = 1;
        maxAttempts = 7;
        srand(time(0));
    }

    void displayWelcome() {
        cout << "\n╔═══════════════════════════════════════════╗\n";
        cout << "║   🏴‍☠️  TREASURE HUNT ADVENTURE  🏴‍☠️      ║\n";
        cout << "╚═══════════════════════════════════════════╝\n\n";
        cout << "Welcome, brave adventurer!\n";
        cout << "Enter your name: ";
        getline(cin, playerName);
        cout << "\nAhoy, Captain " << playerName << "!\n";
        cout << "Find the hidden treasure by guessing the secret number!\n\n";
    }

    void displayRules() {
        cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        cout << "📜 RULES:\n";
        cout << "   • I'll think of a number between 1-100\n";
        cout << "   • You have " << maxAttempts << " attempts to find it\n";
        cout << "   • Each correct guess earns you points!\n";
        cout << "   • Levels get harder as you progress\n";
        cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    }

    void generateSecretNumber() {
        int range = 100 + (level - 1) * 50;
        secretNumber = rand() % range + 1;
        attempts = 0;
        maxAttempts = 7 - (level - 1);
        if (maxAttempts < 3) maxAttempts = 3;
    }

    void displayStatus() {
        cout << "\n┌─────────────────────────────────────┐\n";
        cout << "│ Level: " << level << "  │  Score: " << score << "  │  Attempts Left: " << (maxAttempts - attempts) << " │\n";
        cout << "└─────────────────────────────────────┘\n";
    }

    bool makeGuess() {
        int guess;
        cout << "\n🔍 Enter your guess: ";
        
        // Input validation
        while (!(cin >> guess)) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "❌ Invalid input! Please enter a number: ";
        }

        attempts++;

        if (guess == secretNumber) {
            return true;
        } else if (guess < secretNumber) {
            int difference = secretNumber - guess;
            if (difference <= 5) {
                cout << "🔥 SO CLOSE! The treasure is slightly HIGHER!\n";
            } else if (difference <= 15) {
                cout << "⬆️  Getting warm! Go HIGHER!\n";
            } else {
                cout << "⬆️  Too low! The treasure is much HIGHER!\n";
            }
        } else {
            int difference = guess - secretNumber;
            if (difference <= 5) {
                cout << "🔥 SO CLOSE! The treasure is slightly LOWER!\n";
            } else if (difference <= 15) {
                cout << "⬇️  Getting warm! Go LOWER!\n";
            } else {
                cout << "⬇️  Too high! The treasure is much LOWER!\n";
            }
        }

        return false;
    }

    void celebrateWin() {
        int pointsEarned = (maxAttempts - attempts + 1) * level * 10;
        score += pointsEarned;

        cout << "\n╔═══════════════════════════════════════════╗\n";
        cout << "║        🎉 TREASURE FOUND! 🎉              ║\n";
        cout << "╚═══════════════════════════════════════════╝\n";
        cout << "💰 The secret number was: " << secretNumber << "\n";
        cout << "⭐ You found it in " << attempts << " attempts!\n";
        cout << "🏆 Points earned: +" << pointsEarned << "\n";
        cout << "📊 Total Score: " << score << "\n\n";
    }

    void gameOver() {
        cout << "\n╔═══════════════════════════════════════════╗\n";
        cout << "║         💀 OUT OF ATTEMPTS! 💀            ║\n";
        cout << "╚═══════════════════════════════════════════╝\n";
        cout << "😔 The treasure was at: " << secretNumber << "\n";
        cout << "📊 Final Score: " << score << "\n\n";
    }

    void displayFinalScore() {
        cout << "\n╔═══════════════════════════════════════════╗\n";
        cout << "║          🏆 FINAL RESULTS 🏆              ║\n";
        cout << "╚═══════════════════════════════════════════╝\n";
        cout << "Captain " << playerName << "'s Adventure Summary:\n";
        cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
        cout << "   Levels Completed: " << (level - 1) << "\n";
        cout << "   Final Score: " << score << "\n";
        
        if (score >= 500) {
            cout << "\n   🌟 LEGENDARY PIRATE! 🌟\n";
        } else if (score >= 300) {
            cout << "\n   ⭐ MASTER TREASURE HUNTER! ⭐\n";
        } else if (score >= 150) {
            cout << "\n   🔱 SKILLED ADVENTURER! 🔱\n";
        } else {
            cout << "\n   🗡️  BRAVE EXPLORER! 🗡️\n";
        }
        cout << "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
        cout << "Thanks for playing, Captain " << playerName << "!\n\n";
    }

    void playLevel() {
        generateSecretNumber();
        displayStatus();

        cout << "\n🗺️  Level " << level << ": Find the treasure between 1-" << (100 + (level - 1) * 50) << "!\n";

        while (attempts < maxAttempts) {
            if (makeGuess()) {
                celebrateWin();
                return;
            }
        }

        gameOver();
        level = -1; // Signal game over
    }

    void play() {
        displayWelcome();
        displayRules();

        char playAgain = 'y';
        
        while (playAgain == 'y' || playAgain == 'Y') {
            playLevel();

            if (level == -1) {
                displayFinalScore();
                break;
            }

            cout << "🎮 Continue to Level " << (level + 1) << "? (y/n): ";
            cin >> playAgain;

            if (playAgain == 'y' || playAgain == 'Y') {
                level++;
            } else {
                displayFinalScore();
            }
        }
    }
};

int main() {
    TreasureHuntGame game;
    game.play();
    
    return 0;
}