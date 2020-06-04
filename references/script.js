
/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of the GNU Affero General Public License v3.0.
 * You should have received a copy of the GNU Affero General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY                           
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES                          
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT                           
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,                                
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED                          
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;                               
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER                              
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN                         
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *  
 *
 */

const autoload = require('auto-load');
const files = autoload(__dirname +'/validationFunctions');

const escaper = (funcs) => {
    const removeOuterLayer = (functionString) => String(functionString).replace(/.*=>(\s)*/,'');
    if (Array.isArray(funcs)){
        return funcs.map(func => removeOuterLayer(func))
    }
    else if (typeof funcs === "function"){
        return [removeOuterLayer(funcs)]
    }
    //otherwise it's a subfolder
}

const escapeFunctions = (scripts) => {
    return Object.fromEntries(
        Object.entries(scripts).map(
            ([scriptName,scriptString]) => [scriptName, escaper(scriptString)]
        )
    );
}


const buildScriptObject = (files) => {
   return Object.fromEntries(
        Object.entries(files).map(
            ([fileName, scriptCollection]) => [fileName, escapeFunctions(scriptCollection)]
        )
    );
}

const escapedScripts = buildScriptObject(files);

module.exports = escapedScripts ;

