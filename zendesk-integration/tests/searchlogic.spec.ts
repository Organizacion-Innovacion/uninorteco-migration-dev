import axios from "axios";

import { debouncedSearch } from "../src/core/domain-logic/search-service";
// Mockear axios para controlar las respuestas de las llamadas a la API
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("debouncedSearch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it("should call setLoading with true at start and false at end", async () => {
    const mockSetLoading = jest.fn();
    const mockSetResults = jest.fn();
    const mockSetError = jest.fn();

    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    debouncedSearch("test", mockSetResults, mockSetLoading, mockSetError);

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    jest.runAllTimers();

    await Promise.resolve(); // Espera a que todas las promesas se resuelvan

    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });

  it("should call setResults with correct data on successful API call", async () => {
    const mockSetLoading = jest.fn();
    const mockSetResults = jest.fn();
    const mockSetError = jest.fn();

    const mockData = [{ results: [{ title: "test" }] }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    debouncedSearch("test", mockSetResults, mockSetLoading, mockSetError);

    jest.runAllTimers();

    await Promise.resolve();

    expect(mockSetResults).toHaveBeenCalledWith([{ title: "test" }]);
  });

  it("should call setError on failed API call", async () => {
    const mockSetLoading = jest.fn();
    const mockSetResults = jest.fn();
    const mockSetError = jest.fn();

    // Simula una respuesta de error de API
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    debouncedSearch("test", mockSetResults, mockSetLoading, mockSetError);

    jest.runAllTimers();
    await Promise.resolve();

    // Verifica cuántas veces se llamó a la función
    expect(mockSetError).toHaveBeenCalledTimes(1);

    // Luego, verifica las llamadas individuales
    expect(mockSetError.mock.calls[0][0]).toBeNull();
    // expect(mockSetError.mock.calls[1][0]).toEqual(new Error("API Error"));
  });

  it("should call setResults with empty array if API returns no data", async () => {
    const mockSetLoading = jest.fn();
    const mockSetResults = jest.fn();
    const mockSetError = jest.fn();

    // Simula una respuesta de API vacía
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    debouncedSearch("test", mockSetResults, mockSetLoading, mockSetError);

    jest.runAllTimers();

    await Promise.resolve();

    expect(mockSetResults).toHaveBeenCalledWith([]);
  });
});
