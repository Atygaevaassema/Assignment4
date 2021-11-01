class Person {
    constructor(name, price, letter) {
        this.name = name;
        this.price = price;
        this.letter = letter
    }
}

document.getElementById('submit').addEventListener("click", function () {
    let person = calculate()
    if (person != null) {
        document.getElementById('result').innerHTML = `The price for your bride ${person.name} is ${person.price}. Your love letter is "${person.letter}"`;
    } else {
        document.getElementById('result').innerHTML = "Enter valid data, please!"
    }
});


calculate = () => {
    let name = document.getElementById('name').value
    let starting_bid = document.getElementById('starting_bid').value
    let letter = document.getElementById('love_letter').value

    if (name != '' && starting_bid != '') {
        let price = Number(starting_bid)
        // first part
        const education = document.getElementById('education');
        let education_value = education.options[education.selectedIndex].value;
        if (education_value != 'blank') {
            education_value = Number(education_value)
            price = price * education_value
        }

        // second part
        const networth = document.getElementById('networth');
        let networth_value = networth.options[networth.selectedIndex].value;
        if (networth_value != 'blank') {
            networth_value = Number(networth_value)
            price = price * networth_value
        }

        // third part
        const caste = document.getElementById('caste');
        let caste_value = caste.options[caste.selectedIndex].value;
        if (caste_value != 'blank') {
            caste_value = Number(caste_value)
            price = price + caste_value
        }

        // forth part
        const skills = Array.from(document.querySelectorAll(".skills")).filter((v) => v.checked).map((v) => Number(v.value));
        if (skills.length != 0) {
            const skills_total_value = skills.reduce((accumulator, skills_value) => accumulator + skills_value, 0)
            price = price + skills_total_value
        }

        // fifth part
        const age = document.getElementsByName("age")
        age.forEach(item => {
            if (item.checked) {
                price = price * Number(item.value)
            }
        })

        //sixth part
        const reputation = Array.from(document.querySelectorAll(".reputation")).filter((v) => v.checked).map((v) => Number(v.value));
        for (let i = 0; i < reputation.length; i++) {
            if (Number.isInteger(reputation[i])) {
                price = price + reputation[i]
            }
            else {
                price = price * reputation[i]
            }
        }
        return new Person(name, price, letter)
    }
    return null
}