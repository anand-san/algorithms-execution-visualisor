var NumbersArray = []
var TotalInputs = 0
window.onload = function (e) {
    document.querySelector("#VisualisationSection").style.display = "none"
    document.getElementById("inputArraySubmitButton").onclick = (e) => {
        e.preventDefault()
        let InputValue = parseInt(document.getElementById("arrayNumberInput").value)
        if (!InputValue)
            return
        if (this.NumbersArray.includes(InputValue)) {
            handleAlerts(`${InputValue} is already present. Enter distinct values`)
            return
        }
        if (InputValue > 230) {
            handleAlerts(`Enter a value less than 230, To provide better visualization animations we have restricted the input to 230`)
            return
        }
        NumbersArray.push(InputValue)
        document.querySelector("#VisualisationSection").style.display = "block"
        document.getElementById('algoVisualiserBars').innerHTML += '<div class="progress vertical"><div id="Number' + TotalInputs + '" class="progress-bar" role="progressbar" style="width: ' + InputValue * 3 + 'px">' + InputValue + '</div></div>'
        TotalInputs += 1
        document.getElementById("arrayNumberInput").value = ""
        document.getElementById("algoVisualiserBarsOriginalArrayValue").innerText += " " + InputValue + ","
    }
    document.getElementById("sortingButton").onclick = (e) => {
        e.preventDefault()
        switch (document.getElementById("sortingTypeSelect").value) {
            case "bubble":
                BubbleSort(NumbersArray)
                break;
            default:
                handleAlerts("Please chhose a value from dropdown!")
                break;
        }
    }
}

const SwapVisualValues = (id1, id2) => {
    let element1 = document.querySelector("#" + id1)
    let element2 = document.querySelector("#" + id2)
    element1.classList.add("selectedProgress")
    element2.classList.add("selectedProgress")
    let Values = {
        E1: {
            Value: element1.textContent,
            Width: element1.style.width
        },
        E2: {
            Value: element2.textContent,
            Width: element2.style.width
        }
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            element1.textContent = Values.E2.Value
            element1.style.width = Values.E2.Width
            element2.textContent = Values.E1.Value
            element2.style.width = Values.E1.Width
            setTimeout(() => {
                element1.classList.remove("selectedProgress")
                element2.classList.remove("selectedProgress")
                resolve(true)
            }, 800)
        }, 800)
    })
}

const BubbleSort = async (inputArr) => {
    let iterationCount = 0
    let functionTimer = performance.now()
    hideAllOtherCodes()
    showCodeAndDryRunSection()
    document.querySelector("#sortingButton").disabled = true
    document.querySelector("#bubbleSortCode").style.display = "block"
    let len = inputArr.length
    for (let i = 0; i < len; i++) {
        iterationCount += 1
        highlightCodeExecution("bubbleSortCodeForLoop1", "black")
        dryRunHandler("p", `Iteration # ${iterationCount} - Entering 1st for loop (i), Value of i = ${i}`, "algoVisualiserBarsRuntimeValue")
        for (let j = 0; j < len; j++) {
            highlightCodeExecution("bubbleSortCodeForLoop2", "cyan")
            iterationCount += 1
            dryRunHandler("p", `Iteration # ${iterationCount} - Entering 2nd for loop (j), Value of j = ${j}`, "algoVisualiserBarsRuntimeValue")
            if (parseInt(inputArr[j]) > parseInt(inputArr[j + 1])) {
                highlightCodeExecution("bubbleSortCodeConditionCheck", "green")
                await sleep(200)
                dryRunHandler("p", `Iteration # ${iterationCount} - Swapping ${inputArr[j]} with ${inputArr[j + 1]}  |  Resultant Arr : ${inputArr}`, "algoVisualiserBarsRuntimeValue")
                let tmp = inputArr[j];
                highlightCodeExecution("bubbleSortCodeTempVarStore", "grey")
                await sleep(200)
                inputArr[j] = inputArr[j + 1];
                highlightCodeExecution("bubbleSortCodeSwapVar1", "grey")
                await sleep(200)
                inputArr[j + 1] = tmp;
                highlightCodeExecution("bubbleSortCodeSwapVar2", "grey")
                await sleep(200)
                await SwapVisualValues("Number" + inputArr.indexOf(inputArr[j]), "Number" + inputArr.indexOf(inputArr[j + 1]))
                highlightCodeExecution("bubbleSortCodeConditionCheck", "white")
                highlightCodeExecution("bubbleSortCodeSwapVar2", "white")
                highlightCodeExecution("bubbleSortCodeSwapVar1", "white")
                highlightCodeExecution("bubbleSortCodeTempVarStore", "white")
                highlightCodeExecution("bubbleSortCodeConditionExit", "green")
                await sleep(800)
                highlightCodeExecution("bubbleSortCodeConditionExit", "white")
            }
            highlightCodeExecution("bubbleSortCodeForLoop2Exit", "cyan")
            await sleep(100)
            highlightCodeExecution("bubbleSortCodeForLoop2Exit", "white")
            highlightCodeExecution("bubbleSortCodeForLoop2", "white")
            dryRunHandler("p", `Iteration # ${iterationCount} - Exiting 2nd Loop (j)`, "algoVisualiserBarsRuntimeValue")
        }
        highlightCodeExecution("bubbleSortCodeForLoop1Exit", "cyan")
        await sleep(100)
        highlightCodeExecution("bubbleSortCodeForLoop1", "white")
        highlightCodeExecution("bubbleSortCodeForLoop1Exit", "white")
        dryRunHandler("p", `Iteration # ${iterationCount} - Exiting 1st Loop (i)`, "algoVisualiserBarsRuntimeValue")
    }
    dryRunHandler("p", `Dry Run Complete, Final Array : ${inputArr}`, "algoVisualiserBarsRuntimeValue")
    dryRunHandler("p", `Execution took ${(((performance.now() - functionTimer) / 1600) / 1000).toFixed(4)} seconds (${((performance.now() - functionTimer) / 1600).toFixed(4)} ms)`, "algoVisualiserBarsRuntimeValue")
    document.querySelector("#sortingButton").disabled = false
}

const handleAlerts = message => {
    document.querySelector("#topAlert").classList.remove("hide")
    document.querySelector("#topAlert").classList.add("show")
    document.querySelector("#topAlertMessage").textContent = message
    document.querySelector("#topAlert").style.borderColor = "coral"
    document.querySelector("#topAlert").style.backgroundColor = "coral"
    setTimeout(() => {
        document.querySelector("#topAlert").style.borderColor = "#ffeeba"
        document.querySelector("#topAlert").style.backgroundColor = "#ffeeba"
        document.querySelector("#topAlertMessage").textContent = "Welcome! Start the process by entering numbers in the input box"
    }, 2500)
}

const hideAllOtherCodes = () => {
    document.querySelector("#bubbleSortCode").style.display = "none"
}

const showCodeAndDryRunSection = () => {
    document.querySelector("#algoVisualiserBarsCode").style.display = "block"
    document.querySelector("#algoVisualiserBarsRuntime").style.display = "block"
}

const dryRunHandler = (elementToCreate, elementValue, mainElementIdToMergeWith) => {
    let elem = document.createElement(elementToCreate);
    elem.style.marginBottom = "0px"
    elem.style.color = "#007bff"
    elem.textContent = elementValue
    document.getElementById(mainElementIdToMergeWith).appendChild(elem);
}

const highlightCodeExecution = (ElementId, color) => {
    document.querySelector("#" + ElementId).style.backgroundColor = color
    
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}