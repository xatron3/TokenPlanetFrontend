<template>
  <div class="mt-12">
    <h1 class="text-green-300 text-4xl text-center mb-4">
      Add Token
    </h1>

    <div v-if="this.added !== null" class="text-center">
      <div v-if="this.added === true" class="text-green-400">
        TOKEN ADDED
      </div>
      <div v-else class="text-red-400">
        TOKEN ALREADY EXISTS
      </div>
    </div>

    <div>
      <div class="mb-3 space-y-2 w-full text-sm">
        <label class="text-white py-2">Contract Address</label>
        <input
          placeholder="Contract Address"
          class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-100 rounded-lg h-10 px-4"
          required="required"
          type="text"
          v-model="token.contract_address"
          @change="contractChanged"
          @keyup="contractChanged"
        />
        <p class="text-red text-xs hidden">Please fill out this field.</p>
      </div>
      <div v-if="this.dataLoaded === true">
        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
          <div class="mb-3 space-y-2 w-full text-sm">
            <label class="text-white py-2">Token Name</label>
            <input
              placeholder="Token Name"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-100 rounded-lg h-10 px-4"
              required="required"
              type="text"
              v-model="token.name"
            />
          </div>
          <div class="mb-3 space-y-2 w-full text-sm">
            <label class="text-white py-2">Token Symbol</label>
            <input
              placeholder="Token Symbol"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-100 rounded-lg h-10 px-4"
              required="required"
              type="text"
              v-model="token.symbol"
            />
          </div>
        </div>

        <div class="md:flex flex-row md:space-x-4 w-full text-xs">
          <div class="mb-3 space-y-2 w-full text-sm">
            <label class="text-white py-2">Website</label>
            <input
              placeholder="Website"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-100 rounded-lg h-10 px-4"
              required="required"
              type="text"
              v-model="token.website"
            />
          </div>
          <div class="mb-3 space-y-2 w-full text-sm">
            <label class="text-white py-2">Telegram</label>
            <input
              placeholder="Telegram"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-100 rounded-lg h-10 px-4"
              required="required"
              type="text"
              v-model="token.telegram"
            />
          </div>

          <div class="mb-3 space-y-2 w-full text-sm">
            <label class="text-white py-2">Twitter</label>
            <input
              placeholder="Twitter"
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-100 rounded-lg h-10 px-4"
              required="required"
              type="text"
              v-model="token.twitter"
            />
          </div>
          <div class="mb-3 space-y-2 w-full text-sm">
            <label class="text-white py-2 block">Dividends</label>

            <input
              type="checkbox"
              class="h-5 w-5 bg-gray-100"
              v-model="token.dividends"
            />
          </div>
        </div>

        <div class="flex-auto w-full mb-1 text-sm space-y-2">
          <label class="text-white py-2">Description</label>
          <textarea
            name="message"
            class="h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-100 rounded-lg  py-4 px-4"
            placeholder="Token Description"
            v-model="token.desc"
          ></textarea>
        </div>

        <div>
          <button
            @click="addToken"
            class="inline-flex px-4 py-2 font-medium 
        tracking-wide text-white 
        text-sm
        mt-2
        capitalize transition-colors duration-200 transform 
        bg-green-400 
        rounded-md 
        hover:bg-green-500 
        focus:outline-none focus:bg-green-500"
          >
            ADD TOKEN
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tokenController from "../../controllers/tokenController";
import axios from "axios";
import config from "../../helpers/config";

export default {
  name: "AddToken",
  data() {
    return {
      token: {},
      dataLoaded: false,
      added: null,
    };
  },
  methods: {
    async contractChanged() {
      if (this.token.contract_address) {
        const data = await tokenController.getTokenInformation(
          this.token.contract_address
        );

        this.token.name = data.name;
        this.token.symbol = data.symbol;

        this.dataLoaded = true;
      }
    },
    async addToken() {
      if (this.emptyData()) {
        const url = `${config.apiUrl}/tokens`;

        axios
          .post(url, this.token)
          .then((resp) => {
            this.added = resp.data;
          })
          .catch((err) => console.log(err));
      }
    },
    emptyData() {
      const data = this.token.name !== "" && this.token.symbol !== "";

      return data;
    },
  },
  mounted() {},
};
</script>
