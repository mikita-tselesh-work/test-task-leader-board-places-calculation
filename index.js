/**
 * ТРЕБОВАНИЕ:
 *
 * Необходимо реализовать функцию calculateLeaderboardPlaces.
 * Функция распределяет места пользователей, учитывая ограничения для получения первых мест и набранные пользователями очки.
 * Подробное ТЗ смотреть в readme.md

 * Файл preview.png носит иллюстративный характер, не нужно релизовывать UI!
 * Реализованную функцию прислать в виде js файла
 */

/**
 * ТЕХНИЧЕСКИЕ ОГРАНИЧЕНИЯ:
 *
 * количество очков это всегда целое положительное число
 * firstPlaceMinScore > secondPlaceMinScore > thirdPlaceMinScore > 0
 * в конкурсе участвует от 1 до 100 пользователей
 * 2 пользователя не могут набрать одинаковое количество баллов (разные баллы у пользователей гарантируются бизнес-логикой, не стоит усложнять алгоритм)
 * нет ограничений на скорость работы функции и потребляемую ей память
 * при реализации функции разрешается использование любых библиотек, любого стиля написания кода
 * в функцию передаются только валидные данные, которые соответствуют предыдущим ограничениям (проверять это в функции не нужно)
 */

/**
 * ВХОДНЫЕ ДАННЫЕ:
 *
 * @param users - это список пользователей и заработанные каждым из них очки,
 * это неотсортированный массив вида [{userId: "id1", score: score1}, ... , {userId: "idn", score: scoreN}], где score1 ... scoreN положительные целые числа, id1 ... idN произвольные неповторяющиеся идентификаторы
 *
 * @param minScores - это значения минимального количества очков для первых 3 мест
 * это объект вида { firstPlaceMinScore: score1, secondPlaceMinScore: score2, thirdPlaceMinScore : score3 }, где score1 > score2 > score3 > 0 целые положительные числа
 */

/**
 * РЕЗУЛЬТАТ:
 *
 * Функция должна вернуть пользователей с занятыми ими местами
 * Массив вида (сортировка массива не важна): [{userId: "id1", place: user1Place}, ..., {userId: "idN", place: userNPlace}], где user1Place ... userNPlace это целые положительные числа равные занятым пользователями местами, id1 ... idN идентификаторы пользователей из массива users
 */

function calculateLeaderboardPlaces(users, minScores) {
    const { firstPlaceMinScore, secondPlaceMinScore, thirdPlaceMinScore } = minScores;
    const usersSortedByScore = users.toSorted(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA);
    const result = [];

    for (let i = 0, placeOffset = 0, currentUserPlace; i < usersSortedByScore.length; i++) {
        const { userId, score } = usersSortedByScore[i];

        if (score >= firstPlaceMinScore) {
            currentUserPlace = 1 + placeOffset;
            placeOffset++;
        } else if (score >= secondPlaceMinScore) {
            currentUserPlace = 2 + Math.max(placeOffset - 1, 0);
            placeOffset++;
        } else if (score >= thirdPlaceMinScore) {
            currentUserPlace = 3 + Math.max(placeOffset - 2, 0);
            placeOffset++;
        } else {
            currentUserPlace = 4 + (i - placeOffset);
        }

        result.push({ userId, place: currentUserPlace });
    }

    return result;
}

// функция-helper, ее модифицировать не нужно
function checkResult(answer, correctAnswer) {
    if (!answer) return false;
    if (!Array.isArray(answer)) return false;
    if (answer.length !== correctAnswer.length) return false;

    for (let i = 0; i < correctAnswer.length; i++) {
        const correctAnswerElement = correctAnswer[i];

        const answerElement = answer.find(
            (x) => x.userId === correctAnswerElement.userId
        );
        if (!answerElement) return false;

        if (String(answerElement.place) !== String(correctAnswerElement.place))
            return false;
    }

    return true;
}

/**
 * Пример1:
 *
 * users = [{ userId: "id1", score: 3 }, { userId: "id2", score: 2 }, { userId: "id3", score: 1 }]
 * minScores = { firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore : 10 }
 * Ожидаемый результат (любая сортировка внутри массива):
 * [{ userId: "id1", place: 4 }, { userId: "id2", place: 5 }, { userId: "id3", place: 6 } ] // Все пользователи не набрали достаточно очков для 1, 2 и 3го места, поэтому заняли места с 4 по 6.
 */
let result1 = calculateLeaderboardPlaces(
    [
        { userId: "id1", score: 3 },
        { userId: "id2", score: 2 },
        { userId: "id3", score: 1 }
    ],
    { firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore: 10 }
);
console.log(
    "test1",
    checkResult(result1, [
        { userId: "id1", place: 4 },
        { userId: "id2", place: 5 },
        { userId: "id3", place: 6 }
    ])
);

/**
 * Пример2:
 *
 * users = [{ userId: "id1", score: 100 }, { userId: "id2", score: 3 }, { userId: "id3", score: 2 }, { userId: "id4", score: 1 }]
 * minScores = { firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore : 10 }
 * Ожидаемый результат (любая сортировка внутри массива):
 * [{ userId: "id1", place: 1 }, { userId: "id2", place: 4 }, { userId: "id3", place: 5 }, { userId: "id4", place: 6 }] // только "id1" набрал достаточно очков для 1го места, все остальные в топ не вошли
 */
let result2 = calculateLeaderboardPlaces(
    [
        { userId: "id1", score: 100 },
        { userId: "id2", score: 3 },
        { userId: "id3", score: 2 },
        { userId: "id4", score: 1 }
    ],
    { firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore: 10 }
);
console.log(
    "test2",
    checkResult(result2, [
        { userId: "id1", place: 1 },
        { userId: "id2", place: 4 },
        { userId: "id3", place: 5 },
        { userId: "id4", place: 6 }
    ])
);

/**
 * Пример3
 */
let result3 = calculateLeaderboardPlaces([{ userId: "id1", score: 55 }], {
    firstPlaceMinScore: 100,
    secondPlaceMinScore: 50,
    thirdPlaceMinScore: 10
});
console.log("test3", checkResult(result3, [{ userId: "id1", place: 2 }]));

/**
 * Пример4:
*/
let result4 = calculateLeaderboardPlaces(
    [
        { userId: "id2", score: 101 },
        { userId: "id4", score: 52 },
        { userId: "id5", score: 51 },
        { userId: "id1", score: 102 },
        { userId: "id6", score: 50 },
        { userId: "id8", score: 11 },
        { userId: "id3", score: 100 },
        { userId: "id9", score: 10 },
        { userId: "id7", score: 12 },
    ],
    { firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore: 10 }
);
console.log(
    "test4",
    checkResult(result4, [
        { userId: "id1", place: 1 },
        { userId: "id2", place: 2 },
        { userId: "id3", place: 3 },
        { userId: "id4", place: 4 },
        { userId: "id5", place: 5 },
        { userId: "id6", place: 6 },
        { userId: "id7", place: 7 },
        { userId: "id8", place: 8 },
        { userId: "id9", place: 9 }
    ])
);

/**
 * Пример5:
 */
let result5 = calculateLeaderboardPlaces(
    [
        { userId: "id1", score: 200 },
        { userId: "id2", score: 150 },
        { userId: "id3", score: 80 }
    ],
    { firstPlaceMinScore: 180, secondPlaceMinScore: 100, thirdPlaceMinScore: 50 }
);
console.log(
    "test5",
    checkResult(result5, [
        { userId: "id1", place: 1 },
        { userId: "id2", place: 2 },
        { userId: "id3", place: 3 }
    ])
);

/**
 * Пример6:
 */
let result6 = calculateLeaderboardPlaces(
    [
        { userId: "id1", score: 40 },
        { userId: "id2", score: 20 }
    ],
    { firstPlaceMinScore: 50, secondPlaceMinScore: 30, thirdPlaceMinScore: 10 }
);
console.log(
    "test6",
    checkResult(result6, [
        { userId: "id1", place: 2 },
        { userId: "id2", place: 3 }
    ])
);

/**
 * Пример7:
 */
let result7 = calculateLeaderboardPlaces(
    [
        { userId: "id1", score: 300 },
        { userId: "id2", score: 250 },
        { userId: "id3", score: 150 },
        { userId: "id4", score: 50 }
    ],
    { firstPlaceMinScore: 250, secondPlaceMinScore: 200, thirdPlaceMinScore: 100 }
);
console.log(
    "test7",
    checkResult(result7, [
        { userId: "id1", place: 1 },
        { userId: "id2", place: 2 },
        { userId: "id3", place: 3 },
        { userId: "id4", place: 4 }
    ])
);

/**
 * Пример8:
 */
let result8 = calculateLeaderboardPlaces(
    [
        { userId: "id1", score: 13 },
        { userId: "id2", score: 12 },
        { userId: "id3", score: 11 },
        { userId: "id4", score: 5 }
    ],
    { firstPlaceMinScore: 100, secondPlaceMinScore: 50, thirdPlaceMinScore: 10 }
);
console.log(
    "test8",
    checkResult(result8, [
        { userId: "id1", place: 3 },
        { userId: "id2", place: 4 },
        { userId: "id3", place: 5 },
        { userId: "id4", place: 6 }
    ])
);

console.log("-----------------------------------------------------");
