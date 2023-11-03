import React from 'react'
import './NieuwScherm.css'
import '../Welkom/Welkom.css';
import '../Login/Login.css';
import LogoutButton from '../Buttons/LogoutButton';
import BrightnessButton from '../Buttons/BrightnessButton';
import HomeButton from '../Buttons/HomeButton';
import VoertuigenButton from '../Buttons/VoertuigenButton';
import TankkaartenButton from '../Buttons/TankkaartenButton';
import BestuurdersButton from '../Buttons/BestuurdersButton';


const NieuwSchermBestuurders = () => {
    return (
        <div className='containerNieuwScherm'> 
        <div className='containerButtons'> 
        <BrightnessButton/>
        <HomeButton/>
         <LogoutButton></LogoutButton>
         
         </div>
          <div className='thirdScreenContainer'>
            <div className='buttonsThirdScreen'>
            <VoertuigenButton />
          <TankkaartenButton  />
          <BestuurdersButton  />
          </div>
       

          <table>
  <tr>
    <th>Id_Bestuurder</th>
    <th>Naam</th>
    <th>Voornaam</th>
    <th>Straat</th>
    <th>Huisnummer</th>
    <th>Stad</th>
    <th>Postcode</th>
    <th>Geboortedatum</th>
    <th>Rijksregisternummer</th>
    <th>Controle</th>
    <th>Categorie_rijbewijs</th>
    <th>Voertuig_id</th>
    <th>Tankkaart_id</th>
    <th>Geslacht</th>
    <th>Column1</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Smith</td>
    <td>John</td>
    <td>Rue de la Paix</td>
    <td>123</td>
    <td>Brussel</td>
    <td>1000</td>
    <td>5/15/1990</td>
    <td>12345678901</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>101</td>
    <td>201</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>2</td>
    <td>Johnson</td>
    <td>Alice</td>
    <td>Avenue des Roses</td>
    <td>456</td>
    <td>Antwerpen</td>
    <td>2000</td>
    <td>11/20/1988</td>
    <td>23456789012</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>102</td>
    <td>202</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>3</td>
    <td>Doe</td>
    <td>Robert</td>
    <td>Chaussée de Charleroi</td>
    <td>789</td>
    <td>Brugge</td>
    <td>8000</td>
    <td>3/10/1995</td>
    <td>34567890123</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>103</td>
    <td>203</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>4</td>
    <td>Wang</td>
    <td>Li</td>
    <td>Rue du Faubourg</td>
    <td>101</td>
    <td>Gent</td>
    <td>9000</td>
    <td>9/25/1992</td>
    <td>45678901234</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>104</td>
    <td>204</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>5</td>
    <td>Müller</td>
    <td>Sofia</td>
    <td>Allée des Acacias</td>
    <td>987</td>
    <td>Luik</td>
    <td>4000</td>
    <td>12/30/1987</td>
    <td>56789012345</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>105</td>
    <td>205</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>6</td>
    <td>García</td>
    <td>Carlos</td>
    <td>Boulevard Anspach</td>
    <td>111</td>
    <td>Leuven</td>
    <td>3000</td>
    <td>7/8/1991</td>
    <td>67890123456</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>106</td>
    <td>206</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>7</td>
    <td>Kim</td>
    <td>Ji-hoon</td>
    <td>Place Sainte-Catherine</td>
    <td>222</td>
    <td>Charleroi</td>
    <td>6000</td>
    <td>4/5/1993</td>
    <td>78901234567</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>107</td>
    <td>207</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>8</td>
    <td>Santos</td>
    <td>Maria</td>
    <td>Rue des Fripiers</td>
    <td>333</td>
    <td>Namen</td>
    <td>5000</td>
    <td>2/18/1989</td>
    <td>89012345678</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>108</td>
    <td>208</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>9</td>
    <td>Singh</td>
    <td>Raj</td>
    <td>Rue de la Montagne</td>
    <td>555</td>
    <td>Luik</td>
    <td>4000</td>
    <td>6/29/1996</td>
    <td>90123456789</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>109</td>
    <td>209</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>10</td>
    <td>López</td>
    <td>Isabel</td>
    <td>Avenue Louise</td>
    <td>777</td>
    <td>Brussel</td>
    <td>1000</td>
    <td>8/14/1994</td>
    </tr>
    <tr>
    <td>10</td>
    <td>López</td>
    <td>Isabel</td>
    <td>Avenue Louise</td>
    <td>777</td>
    <td>Brussel</td>
    <td>1000</td>
    <td>8/14/1994</td>
    <td>1234567890</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>110</td>
    <td>210</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>11</td>
    <td>Anderson</td>
    <td>Emily</td>
    <td>Rue Neuve</td>
    <td>222</td>
    <td>Brugge</td>
    <td>8000</td>
    <td>3/2/1985</td>
    <td>11223344556</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>111</td>
    <td>211</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>12</td>
    <td>Wilson</td>
    <td>Michael</td>
    <td>Avenue de la Toison dOr</td>
    <td>777</td>
    <td>Antwerpen</td>
    <td>2000</td>
    <td>9/12/1994</td>
    <td>22334455667</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>112</td>
    <td>212</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>13</td>
    <td>Sanchez</td>
    <td>Ana</td>
    <td>Rue des Bouchers</td>
    <td>888</td>
    <td>Leuven</td>
    <td>3000</td>
    <td>6/15/1990</td>
    <td>33445566778</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>113</td>
    <td>213</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>14</td>
    <td>Lee</td>
    <td>Min-ji</td>
    <td>Grand Place</td>
    <td>333</td>
    <td>Brussel</td>
    <td>1000</td>
    <td>1/25/1989</td>
    <td>44556677889</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>114</td>
    <td>214</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>15</td>
    <td>Martin</td>
    <td>David</td>
    <td>Avenue Rogier</td>
    <td>555</td>
    <td>Luik</td>
    <td>4000</td>
    <td>7/4/1993</td>
    <td>55667788990</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>115</td>
    <td>215</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>16</td>
    <td>Patel</td>
    <td>Meera</td>
    <td>Rue de la Casquette</td>
    <td>999</td>
    <td>Charleroi</td>
    <td>6000</td>
    <td>5/28/1986</td>
    <td>66778899001</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>116</td>
    <td>216</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>17</td>
    <td>Brown</td>
    <td>Olivia</td>
    <td>Rue Saint-Paul</td>
    <td>111</td>
    <td>Namen</td>
    <td>5000</td>
    <td>11/19/1996</td>
    <td>77889900112</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>117</td>
    <td>217</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>18</td>
    <td>Kim</td>
    <td>Jin-woo</td>
    <td>Rue Léopold</td>
    <td>777</td>
    <td>Leuven</td>
    <td>3000</td>
    <td>10/8/1991</td>
    <td>88990011223</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>118</td>
    <td>218</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>19</td>
    <td>Jackson</td>
    <td>Sophia</td>
    <td>Quai de la Boverie</td>
    <td>444</td>
    <td>Brugge</td>
    <td>8000</td>
    <td>2/14/1988</td>
    <td>99001122334</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>119</td>
    <td>219</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>20</td>
    <td>Wu</td>
    <td>Chen</td>
    <td>Rue de la Liberté</td>
    <td>123</td>
    <td>Antwerpen</td>
    <td>2000</td>
    <td>3/30/1992</td>
    <td>112233445</td>
    <td>ONWAAR</td>
  </tr>
  <tr>
    <td>20</td>
    <td>Wu</td>
    <td>Chen</td>
    <td>Rue de la Liberté</td>
    <td>123</td>
    <td>Antwerpen</td>
    <td>2000</td>
    <td>3/30/1992</td>
    <td>112233445</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>120</td>
    <td>220</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>21</td>
    <td>Hernández</td>
    <td>José</td>
    <td>Place du Marché</td>
    <td>555</td>
    <td>Brussel</td>
    <td>1000</td>
    <td>7/5/1987</td>
    <td>11223344556</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>121</td>
    <td>221</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>22</td>
    <td>Smith</td>
    <td>Emma</td>
    <td>Rue du Midi</td>
    <td>888</td>
    <td>Antwerpen</td>
    <td>2000</td>
    <td>12/22/1990</td>
    <td>22334455667</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>122</td>
    <td>222</td>
    <td>F</td>
    <td></td>
  </tr>
  <tr>
    <td>23</td>
    <td>Johnson</td>
    <td>William</td>
    <td>Grand Place</td>
    <td>111</td>
    <td>Brugge</td>
    <td>8000</td>
    <td>8/15/1984</td>
    <td>33445566778</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>123</td>
    <td>223</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>24</td>
    <td>Kim</td>
    <td>Soo-jin</td>
    <td>Avenue Louise</td>
    <td>777</td>
    <td>Luik</td>
    <td>4000</td>
    <td>6/18/1995</td>
    <td>44556677889</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>124</td>
    <td>224</td>
    <td>F</td>
    <td></td>
  </tr>
  <tr>
    <td>25</td>
    <td>González</td>
    <td>Luis</td>
    <td>Rue Neuve</td>
    <td>333</td>
    <td>Brussel</td>
    <td>1000</td>
    <td>3/12/1993</td>
    <td>55667788990</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>125</td>
    <td>225</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>26</td>
    <td>Martínez</td>
    <td>Isabella</td>
    <td>Place du Marché</td>
    <td>444</td>
    <td>Antwerpen</td>
    <td>2000</td>
    <td>4/2/1986</td>
    <td>66778899001</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>126</td>
    <td>226</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>27</td>
    <td>Lewis</td>
    <td>James</td>
    <td>Rue de la Casquette</td>
    <td>222</td>
    <td>Leuven</td>
    <td>3000</td>
    <td>9/29/1991</td>
    <td>77889900112</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>127</td>
    <td>227</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>28</td>
    <td>Park</td>
    <td>Sung-hoon</td>
    <td>Rue Saint-Paul</td>
    <td>999</td>
    <td>Charleroi</td>
    <td>6000</td>
    <td>11/11/1992</td>
    <td>88990011223</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>128</td>
    <td>228</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>29</td>
    <td>Adams</td>
    <td>Oliver</td>
    <td>Rue Léopold</td>
    <td>555</td>
    <td>Namen</td>
    <td>5000</td>
    <td>6/23/1988</td>
    <td>99001122334</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>129</td>
    <td>229</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>30</td>
    <td>Chen</td>
    <td>Li</td>
    <td>Rue de la Bourse</td>
    <td>123</td>
    <td>Luik</td>
    <td>4000</td>
    <td>1/28/1994</td>
    <td>112233445</td>
    <td>ONWAAR</td>
    <td>C</td>
   </tr>
   <tr>
    <td>30</td>
    <td>Chen</td>
    <td>Li</td>
    <td>Rue de la Bourse</td>
    <td>123</td>
    <td>Luik</td>
    <td>4000</td>
    <td>1/28/1994</td>
    <td>112233445</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>130</td>
    <td>230</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>31</td>
    <td>Li</td>
    <td>Ming</td>
    <td>Rue des Carmes</td>
    <td>666</td>
    <td>Brussel</td>
    <td>1000</td>
    <td>7/15/1989</td>
    <td>11223344556</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>131</td>
    <td>231</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>32</td>
    <td>Murphy</td>
    <td>Grace</td>
    <td>Avenue Rogier</td>
    <td>888</td>
    <td>Antwerpen</td>
    <td>2000</td>
    <td>2/8/1990</td>
    <td>22334455667</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>132</td>
    <td>232</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>33</td>
    <td>Reyes</td>
    <td>Carlos</td>
    <td>Rue des Bouchers</td>
    <td>444</td>
    <td>Leuven</td>
    <td>3000</td>
    <td>5/22/1996</td>
    <td>33445566778</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>133</td>
    <td>233</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>34</td>
    <td>Hall</td>
    <td>Samantha</td>
    <td>Rue Neuve</td>
    <td>111</td>
    <td>Charleroi</td>
    <td>6000</td>
    <td>9/5/1987</td>
    <td>44556677889</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>134</td>
    <td>234</td>
    <td>V</td>
    <td></td>
  </tr>
  <tr>
    <td>35</td>
    <td>Nguyen</td>
    <td>Minh</td>
    <td>Grand Place</td>
    <td>555</td>
    <td>Namen</td>
    <td>5000</td>
    <td>3/19/1993</td>
    <td>55667788990</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>135</td>
    <td>235</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>36</td>
    <td>Wilson</td>
    <td>Jacob</td>
    <td>Avenue Louise</td>
    <td>777</td>
    <td>Brussel</td>
    <td>1000</td>
    <td>1/31/1992</td>
    <td>66778899001</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>136</td>
    <td>236</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>37</td>
    <td>Hernández</td>
    <td>Juan</td>
    <td>Rue du Midi</td>
    <td>333</td>
    <td>Luik</td>
    <td>4000</td>
    <td>4/22/1984</td>
    <td>77889900112</td>
    <td>ONWAAR</td>
    <td>C</td>
    <td>137</td>
    <td>237</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>38</td>
    <td>Choi</td>
    <td>Eun-ji</td>
    <td>Place du Marché</td>
    <td>222</td>
    <td>Leuven</td>
    <td>3000</td>
    <td>8/8/1991</td>
    <td>88990011223</td>
    <td>ONWAAR</td>
    <td>A</td>
    <td>138</td>
    <td>238</td>
    <td>F</td>
    <td></td>
  </tr>
  <tr>
    <td>39</td>
    <td>Kim</td>
    <td>Hyun-woo</td>
    <td>Rue de la Casquette</td>
    <td>123</td>
    <td>Charleroi</td>
    <td>6000</td>
    <td>11/14/1995</td>
    <td>99001122334</td>
    <td>ONWAAR</td>
    <td>B</td>
    <td>139</td>
    <td>239</td>
    <td>M</td>
    <td></td>
  </tr>
  <tr>
    <td>40</td>
    <td>Thomas</td>
    <td>Laura</td>
    <td>Quai de la Boverie</td>
    <td>999</td>
    <td>Namen</td>
    <td>5000</td>
    <td>6/28/1990</td>
    <td>112233445</td>
    <td>ONWAAR</td>
    <td>C</td>
    </tr>
    </table>



    
    
          </div>
          
          </div>
          
          
     
          
        
      )
    }

export default NieuwSchermBestuurders