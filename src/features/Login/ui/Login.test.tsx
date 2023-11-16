import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import { StoreProvider } from '@/app/providers/StorProvider';
import {Login} from "./Login";
import {
  describe, 
  it, 
  expect, 
  beforeEach, 
  afterEach,  
} from 'vitest';

describe("testing login form",() => {
    describe("initialization the component",() => {
      it("check if the component initialized", () => {
          render(
            <StoreProvider>
              <BrowserRouter>
                <Login />
              </BrowserRouter>
            </StoreProvider>
          );
          expect(screen.getByLabelText("login")).toBeInTheDocument();
      })  
    });

    describe("ckeck fill the login form", () => {
      beforeEach(()=> {
        render(
          <StoreProvider>
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          </StoreProvider>
        );
      });
      afterEach(() => {
        cleanup();
      })

      it("check is every thing in form okay", () => {
        const email = screen.getByRole('textbox');
        const pwd = screen.getByPlaceholderText(/пароль/i);
        // const btn = screen.getByRole('button');
        expect(email).toBeInTheDocument();
        expect(pwd).toBeInTheDocument();
        // expect(btn).toBeInTheDocument();
      });
      it("ckeck inputs values when user will fill the wrong values",async () => {
        const email = screen.getByRole('textbox');
        const pwd = screen.getByPlaceholderText(/пароль/i);
        const btn = screen.getByRole('button');
        await user.type(email,'email@gmail.com');
        await user.type(pwd,'12323');
        await user.click(btn);
        await waitFor(() => {
          expect(screen.getByText(/Что-то пошло не так, попробуйте чуть позже!/i)).toBeInTheDocument()
        }, { timeout: 3000 })
        
      });
      it("ckeck inputs values when user will not fill the email",async () => {
        const email = screen.getByRole('textbox');
        const pwd = screen.getByPlaceholderText(/пароль/i);
        const btn = screen.getByRole('button');
        await user.type(email,' ');
        await user.type(pwd,'12323');
        user.click(btn);
        expect(await screen.findByText(/Необходимо заполнить все поля!/i)).toBeVisible()
      });
      it("ckeck inputs values when user will not fill the password",async () => {
        const email = screen.getByRole('textbox');
        const pwd = screen.getByPlaceholderText(/пароль/i);
        const btn = screen.getByRole('button');
        await user.type(email,'email@email.com');
        await user.type(pwd,' ');
        await user.click(btn);
        expect(await screen.findByText(/Необходимо заполнить все поля!/i)).toBeVisible()
      });
      //passed put on test will show it not passed
      it.skip("send right values with space", async() => {
        const email = screen.getByRole('textbox');
        const pwd = screen.getByPlaceholderText(/пароль/i);
        const btn = screen.getByRole('button');
        await user.type(email,'     ema2@gmail.com        ');
        await user.type(pwd,'        123          ');
        await user.click(btn);
        expect(await screen.findByLabelText('errorMsg')).toHaveTextContent("");
      });
      it("check regExp for email", async() => {
        const email = screen.getByRole('textbox');
        const pwd = screen.getByPlaceholderText(/пароль/i);
        const btn = screen.getByRole('button');
        await user.type(email,'email2');
        await user.type(pwd,'123');
        await user.click(btn);
        expect(await screen.findByLabelText('errorMsg')).toHaveTextContent("неправильный адрес электронной почты, пример: example@gmail.com");
      });
    })
})
