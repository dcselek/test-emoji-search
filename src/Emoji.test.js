import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import React from 'react'
import App from './App';

describe('all test', () => {
    let emoji100, input;

    beforeEach(() => {
        render(<App />);
        emoji100 = screen.getByText(/100/i)
        input = screen.getByPlaceholderText(/search emoji/i)
    })

    it("should got header", () => {
        const headerTitle = screen.getByText(/Emoji Search/i)
        expect(headerTitle).toBeInTheDocument();
    })

    it("should render emoji list", () => {
        expect(emoji100).toBeInTheDocument()
    })

    it("should filter", () => {
        const emojiText = "grim"
        userEvent.type(input, emojiText)
        expect(emoji100).not.toBeInTheDocument()
    })

    it("should copy", () => {
        //öncelikle execCommand'i mockluyoruz.
        document.execCommand = jest.fn(); // execCommand detaylı bakmak için link: https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
        //uygulamayı ayağa kaldırıp console üzerinden document.execCommand("copy") yazdığınızda fareniz ile daha önce seçtiğiniz yeri kopyalar. execCommand'in bunun gibi fonksiyonları var.
        userEvent.click(emoji100) //emoji100 üzerine tıklamayı sağlıyoruz

        expect(document.execCommand).toBeCalledWith('copy') // burada execCommand'in 'copy' olarak çağırılıp çağırılmadığını soruyoruz
        
        const copyEmoji = window.ClipboardData; //kopyalanan datayı alıyoruz.
        expect(copyEmoji).toEqual(emoji100.value)
    })
});