/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/mulheres';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.mulheres.forEach(item => insertList(item.name, 
                                                  item.radius, 
                                                  item.texture,
                                                  item.perimeter,
                                                  item.area,
                                                  item.smoothness,
                                                  item.compactness,
                                                  item.concavity,
                                                  item.concave,
                                                  item.symmetry,
                                                  item.fractal,
                                                  item.outcome
                                                ))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputWoman, inputRadius, inputTexture, inputPerimeter, inputArea, inputSmoothness, inputCompactness, inputConcavity, inputConcave, inputSymmetry, inputFractal) => {
      
    const formData = new FormData();
    formData.append('name', inputWoman);
    formData.append('radius', inputRadius);
    formData.append('texture', inputTexture);
    formData.append('perimeter', inputPerimeter);
    formData.append('area', inputArea);
    formData.append('smoothness', inputSmoothness);
    formData.append('compactness', inputCompactness);
    formData.append('concavity', inputConcavity);
    formData.append('concave', inputConcave);
    formData.append('symmetry', inputSymmetry);
    formData.append('fractal', inputFractal);
  
    let url = 'http://127.0.0.1:5000/mulher';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
  const insertDeleteButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/mulher?name='+item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item
    --------------------------------------------------------------------------------------
  */
  const newItem = async () => {
    let inputWoman = document.getElementById("newInput").value;
    let inputRadius = document.getElementById("newRadius").value;
    let inputTexture = document.getElementById("newTexture").value;
    let inputPerimeter = document.getElementById("newPerimeter").value;
    let inputArea = document.getElementById("newArea").value;
    let inputSmoothness = document.getElementById("newSmoothness").value;
    let inputCompactness = document.getElementById("newCompactness").value;
    let inputConcavity = document.getElementById("newConcavity").value;
    let inputConcave = document.getElementById("newConcavePoints").value;
    let inputSymmetry = document.getElementById("newSymmetry").value;
    let inputFractal = document.getElementById("newFractalDimension").value;
  
    // Verifique se o nome da mulher já existe antes de adicionar
    const checkUrl = `http://127.0.0.1:5000/mulheres?nome=${inputWoman}`;
    fetch(checkUrl, {
      method: 'get'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.mulheres && data.mulheres.some(item => item.name === inputWoman)) {
          alert("A mulher já está cadastrada.\nCadastre a mulher com um nome diferente ou atualize o existente.");
        } else if (inputWoman === '') {
          alert("O nome da mulher não pode ser vazio!");
        } else if (isNaN(inputRadius) || isNaN(inputTexture) || isNaN(inputPerimeter) || isNaN(inputArea) || isNaN(inputSmoothness) || isNaN(inputCompactness) 
                    || isNaN(inputConcavity) ||  isNaN(inputConcave) ||  isNaN(inputSymmetry) ||  isNaN(inputFractal)) {
          alert("Esse(s) campo(s) precisam ser números!");
        } else {
          insertList(inputWoman, inputRadius, inputTexture, inputPerimeter, inputArea, inputSmoothness, inputCompactness, inputConcavity, inputConcave, inputSymmetry, inputFractal);
          postItem(inputWoman, inputRadius, inputTexture, inputPerimeter, inputArea, inputSmoothness, inputCompactness, inputConcavity, inputConcave, inputSymmetry, inputFractal);
          alert("Item adicionado!");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */

  const insertList = (nameWoman, radius, texture, perimeter, area, smoothness, compactness, concavity, concave, symmetry,  fractal, outcome) => {
    var item = [nameWoman, radius, texture, perimeter, area, smoothness, compactness, concavity, concave, symmetry, fractal, outcome];
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cell = row.insertCell(i);
      cell.textContent = item[i];
    }
  
    var deleteCell = row.insertCell(-1);
    insertDeleteButton(deleteCell);
  
  
    document.getElementById("newInput").value = "";
    document.getElementById("newRadius").value = "";
    document.getElementById("newTexture").value = "";
    document.getElementById("newPerimeter").value = "";
    document.getElementById("newArea").value = "";
    document.getElementById("newSmoothness").value = "";
    document.getElementById("newCompactness").value = "";
    document.getElementById("newConcavity").value = "";
    document.getElementById("newConcavePoints").value = "";
    document.getElementById("newSymmetry").value = "";
    document.getElementById("newFractalDimension").value = "";

    removeElement();
  }